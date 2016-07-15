export default function({ types }) {
    return {
        visitor: {
            Function: function parseFunctionPath(path) {
                (path.get('params') || []).reverse().forEach(function(param) {
                    const decorators = param.node.decorators.reverse();

                    if (param.node && Array.isArray(decorators)) {
                        let currentDecorator;

                        decorators.forEach(function(decorator) {

                            /**
                             * TODO: Validate the name of the decorator is not
                             * the same as any of the passed params
                             */
                            const callNode = types.callExpression(
                                decorator.expression, [
                                    currentDecorator ||
                                    types.Identifier(`_${param.node.name}`)
                                ]
                            );

                            currentDecorator = callNode;
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
                    }
                });
            }
        }
    };
}