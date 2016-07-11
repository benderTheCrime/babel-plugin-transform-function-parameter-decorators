let t;

export default function({ types }) {
    // console.log(types);
    t = types;
    return {
        visitor: {
            Identifier(path) {
                // console.log(path.node);
                // if (path.node.type === 'FunctionExpression') {
                //     console.log(path.node);
                // }
            },
            // ClassDeclaration() {
            //     console.log(arguments);
            // },
            FunctionDeclaration: parseFunctionPath,
            MemberExpression(path) {

                // console.log(path);
                // console.log('member');
            }, // ,
            // MemberDeclaration(path) {
            //     console.log(path);
            // }
            // ObjectMethod: parseFunctionPath,
            ClassMethod() {
                console.log('classmethod');
            }
        }
    };
}

function parseFunctionPath(path) {
    const params = (path.get('params') || []).reverse();
    params.forEach(function(param) {
        if (param.node && Array.isArray(param.node.decorators)) {
            // hasDecorators = true;
            let currentDecorator;

            param.node.decorators.reverse().forEach(function(decorator) {
                // console.log(decorator.expression.callee.name);

                // TODO Params
                let callNode = t.callExpression(
                    decorator.expression,
                    /*decorator.expression.arguments || */[ currentDecorator || t.Identifier(param.node.name) ]
                    // decorator.expression
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
                            // t.assignmentExpression('=', currentDecorator)
                            // t.assignmentExpression('=', t.Identifier('foo'), 'bar')
                        )
                    ]
                )
            );
            param.replaceWith(t.Identifier(`_${param.node.name}`));
        }
    });
        //
        //     // console.log('decorators', Object.keys(param.node.decorators), param.node.decorators.expression());
            // param.node.decorators.forEach(function(decorator) {
            //     if (decorator.expression) {
            //         // console.log('expression', decorator.expression);
            //
            //         expression += `${decorator.expression.callee.name}(`
            //
            //         if (Array.isArray(decorator.expression.arguments)) {
            //             expression += decorator.expression.arguments.map(a => a.name).join(',');
            //         }
            //
            //         expression += ')';
            //
            //         // console.log('callee', decorator.expression.callee);
            //         // console.log('arguments', decorator.expression.arguments);
            //     }
            // });
        // }

        // if (hasDecorators) {
        // expression += `(_${param.node.name});\n`

        // console.log(param.parentPath.type);
            // console.log(types.expressionStatement(types.stringLiteral(expression)));
            // console.log(param.parentPath.get('body').get('body'));

        // }
    // });
}