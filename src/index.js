export default function({ types }) {
    return {
        visitor: {
            Function: function parseFunctionPath(path) {
                (path.get('params') || []).reverse().forEach(function(param) {
                    let resultantDecorator;

                    (param.node.decorators || []).reverse()
                        .forEach(function(decorator) {

                            /**
                             * TODO: Validate the name of the decorator is not
                             * the same as any of the passed params
                             */
                            resultantDecorator = types.callExpression(
                                decorator.expression, [
                                    resultantDecorator ||
                                    types.Identifier(`_${param.node.name}`)
                                ]
                            );
                        });

                    if (resultantDecorator) {
                        param.parentPath.get('body').unshiftContainer(
                            'body', types.variableDeclaration('var', [
                                types.variableDeclarator(
                                    types.Identifier(param.node.name),
                                    resultantDecorator
                                )
                            ])
                        );

                        param.replaceWith(
                            types.Identifier(`_${param.node.name}`)
                        );
                    }
                });
            }
        }
    };
}