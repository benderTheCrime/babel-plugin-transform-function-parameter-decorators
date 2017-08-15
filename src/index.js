import babelHelperOptimiseCallExpression from 'babel-helper-optimise-call-expression';

export default function({ types }) {
    return {
        visitor: {
            Function: function parseFunctionPath(path) {
                (path.get('params') || [])
                    .slice()
                    .reverse()
                    .forEach(function(param) {
                        const name = param.node.name;
                        const paramUidName =
                            path.scope.generateUidIdentifier(name).name;
                        let resultantDecorator;

                        (param.node.decorators || [])
                            .slice()
                            .reverse()
                            .forEach(function(decorator) {
                                resultantDecorator = types.callExpression(
                                    decorator.expression, [
                                        resultantDecorator ||
                                        types.Identifier(paramUidName)
                                    ]
                                );
                            });

                        if (resultantDecorator) {
                            const decoratedParamUidName =
                                path.scope.generateUidIdentifier(name).name;

                            path.scope.rename(name, decoratedParamUidName);
                            let transformExpression = null;

                            if (resultantDecorator.callee.arguments) {
                                transformExpression =
                                    babelHelperOptimiseCallExpression(
                                        babelHelperOptimiseCallExpression(
                                            resultantDecorator.callee.callee,
                                            types.thisExpression(),
                                            resultantDecorator.callee.arguments
                                        ),
                                        types.thisExpression(),
                                        resultantDecorator.arguments
                                    );

                                // like: getName(@test("name") name1) {}
                            } else {
                                transformExpression = types.callExpression(
                                    types.memberExpression(
                                        types.callExpression(
                                            types.memberExpression(
                                                resultantDecorator.callee,
                                                types.identifier('bind')
                                            ),
                                            [ types.thisExpression() ]
                                        ), types.identifier('call')),
                                    [ types.thisExpression() ].concat(
                                        resultantDecorator.arguments
                                    ));

                                // like getName(@test name1) {}
                            }

                            param.parentPath.get('body').unshiftContainer(
                                'body', types.variableDeclaration('var', [
                                    types.variableDeclarator(
                                        types.Identifier(decoratedParamUidName),
                                        transformExpression
                                    )
                                ])
                            );
                            param.replaceWith(types.Identifier(paramUidName));
                        }
                    });
            }
        }
    };
}