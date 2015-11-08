module.exports = {
  message: 'Don\'t use IDs for styling!',
  name: 'no-styling-ids',
  test: function(ast){
    var errors = [];

    ast.traverse(function (node){
      if (node.type !== 'id') {
        return;
      }

      errors.push({
        node: node
      });
    });

    return errors;
  }
};
