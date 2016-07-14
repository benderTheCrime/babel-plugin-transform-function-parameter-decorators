let t;

export default function({ types }) {
    t = types;

    return {
        visitor: {
            FunctionDeclaration: parseFunctionPath,
            // MemberExpression: parseFunctionPath,
            // MemberDeclaration: parseFunctionPath,
            ObjectMethod: parseFunctionPath,
            ClassMethod: function(path) {
                console.log(path.node);
                console.log(path.get('params'));//.map(p => p.node && p.node.decorators));
                return parseFunctionPath(path);
            }
        }
    };
}


// TODO YOU HAVE TO INSTALL TRANSFORM DECORATORS LEGACY
function parseFunctionPath(path) {
    const params = (path.get('params') || []).reverse();

    // console.log('PARAM', params);


    // while (true) {
    //     console.log(1);
    // }

    params.forEach(function(param) {
        // console.log('PARAM', param.node.decorators);
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