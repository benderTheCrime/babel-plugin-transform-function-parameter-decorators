export default function({ types }) {
    return {
        visitor: {
            Function: function parseFunctionPath(path) {
                (path.get('params') || []).reverse().forEach(function(param) {
                    let currentDecorator;

                    ((param.node && param.node.decorators) || []).reverse()
                        .forEach(function(decorator) {

                            /**
                             * TODO: Validate the name of the decorator is not
                             * the same as any of the passed params
                             */
                            currentDecorator = types.callExpression(
                                decorator.expression, [
                                    currentDecorator ||
                                    types.Identifier(`_${param.node.name}`)
                                ]
                            );
                        });

                    param.parentPath.get('body').unshiftContainer(
                        'body', types.variableDeclaration('var', [
                            types.variableDeclarator(
                                types.Identifier(param.node.name),
                                currentDecorator
                            )
                        ])
                    );

                    param.replaceWith(
                        types.Identifier(`_${param.node.name}`)
                    );
                });
            }
        }
    };
}