import Ember from 'ember';
import IndexValidatesMixin from 'computed-demo/mixins/index-validates';
import { module, test } from 'qunit';

module('Unit | Mixin | index validates');

// Replace this with your real tests.
test('it works', function(assert) {
  let IndexValidatesObject = Ember.Object.extend(IndexValidatesMixin);
  let subject = IndexValidatesObject.create();
  assert.ok(subject);
});
