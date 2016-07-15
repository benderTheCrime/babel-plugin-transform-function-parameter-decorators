let t;

export default function({ types }) {
    t = types;

    return {
        visitor: {
            FunctionDeclaration: parseFunctionPath,
            // MemberExpression: parseFunctionPath,
            // MemberDeclaration: parseFunctionPath,
            ObjectMethod: parseFunctionPath,
            ClassMethod: parseFunctionPath
        }
    };
}

function parseFunctionPath(path) {
    const params = (path.get('params') || []).reverse();

    params.forEach(function(param) {
        if (param.node && Array.isArray(param.node.decorators)) {
            let currentDecorator;

            param.node.decorators.reverse().forEach(function(decorator) {
                let callNode = t.callExpression(
                    decorator.expression,
                    [ currentDecorator || t.Identifier(`_${param.node.name}`) ]
                );

                currentDecorator = callNode;
            });
            param.parentPath.get('body').unshiftContainer(
                'body',
                t.variableDeclaration(
                    'var', [
                        t.variableDeclarator(
                            t.Identifier(param.node.name),
                            currentDecorator
                        )
                    ]
                )
            );
            param.replaceWith(t.Identifier(`_${param.node.name}`));
        }
    });
}