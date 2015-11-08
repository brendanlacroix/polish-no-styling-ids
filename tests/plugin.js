define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-no-styling-ids',

    message: function () {
      assert.strictEqual(plugin.message, 'Don\'t use IDs for styling!');
    }
  });

  registerSuite({
    name: 'polish-no-styling-ids CSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/css.css', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'css' }));

        assert.strictEqual(errors.length, 3);
        assert.equal(errors[0].node.toString().trim(), '#this-rule-will-fail');
        assert.equal(errors[1].node.toString().trim(), '#because-of-this-id', 'It should fail on IDs as child selectors.');
        assert.equal(errors[2].node.toString().trim(), '#will-fail-too', 'It should fail on IDs in lists of selectors.');
      }));
    }
  });

  registerSuite({
    name: 'polish-no-styling-ids SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), '#this-rule-will-fail');
        assert.equal(errors[1].node.toString().trim(), '#but-this-one-will', 'It should fail on the nested rule.');
      }));
    }
  });
});