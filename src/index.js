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
                            const resultantCallExpression =
                                babelHelperOptimiseCallExpression(
                                    resultantDecorator.callee.callee,
                                    types.thisExpression(),
                                    resultantDecorator.callee.arguments
                            );
                            const decoratorExpreesion =
                                babelHelperOptimiseCallExpression(
                                    resultantCallExpression,
                                    types.thisExpression(),
                                    resultantDecorator.arguments
                                );

                            param.parentPath.get('body').unshiftContainer(
                                'body', types.variableDeclaration('var', [
                                    types.variableDeclarator(
                                        types.Identifier(decoratedParamUidName),
                                        decoratorExpreesion
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