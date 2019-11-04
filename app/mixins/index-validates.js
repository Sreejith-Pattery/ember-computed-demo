import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Mixin.create(EmberValidations, {
    validations: {
        firstName:{
            presence:true,
            length:{minimum:4, maximum:10}
        },
        lastName:{
            presence:true,
            length:{minimum:4, maximum:10}
        },
        companyName:{
            presence:true,
            length:{minimum:4, maximum:100}
        }
    },
});
