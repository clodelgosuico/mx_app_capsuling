var context = require.context('./spec/client', true, /.+\Spec\.js?$/);

context.keys().forEach(context);
module.exports = context;
