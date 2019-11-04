import Ember from 'ember';
import IndexValidations from 'computed-demo/mixins/index-validates'

export default Ember.Controller.extend(IndexValidations, {
    flashMessages: Ember.inject.service(),
    showErrors:true,
    errors:Ember.computed(function(){
        this.get('errors');
    }),
    firstName:'Tony',
    lastName:'Stark',
    fullName:Ember.computed('firstName','lastName', {
        get(key){
            return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(key, value){
            let [firstName, lastName] = value.split(' ');
            this.set('firstName', firstName);
            this.set('lastName', lastName);
            return value;
        }       
    }),
    companyName:'Stark Industries',
    businessCard:Ember.computed('fullName','companyName', {
        get(key){
            return `${this.get('fullName')} of ${this.get('companyName')}`;
        },
        set(key, value){
            let [fullName, companyName] = value.split(' of ');
            this.set('fullName', fullName);
            this.set('companyName', companyName);
            return value;
        }      
    }),

    documentaries:[
        {name:'Iron Man 1', release:'2008', budget:140000000, boxOffice:318000000},
        {name:'Iron Man 2', release:'2010', budget:200000000, boxOffice:312000000},
        {name:'The Avengers', release:'2012', budget:220000000, boxOffice:623000000},
        {name:'Iron Man 3', release:'2013', budget:200000000, boxOffice:408000000},
        {name:'Avengers 2', release:'2015', budget:250000000, boxOffice:455000000}
    ],

    totalDocumentaryBudget:Ember.computed('documentaries.@each.budget', function(){
        var totalBudget=0;
        this.get('documentaries').forEach(documentary => {
            totalBudget+=Number(documentary.budget)
        });

        return totalBudget;
    }),

    titles:Ember.computed('documentaries', {
        get(key){
            return this.get('documentaries').mapBy('name').join(',');
        },
        set(key, value){
            let arrayOfTitles = value.split(',')
            arrayOfTitles.forEach((title, index)=>{
                let documentary = this.get(`documentaries.${index}`)
                documentary.title =title;
            });
            return value;
        }
    }),

    totalDocumentaryProfit:Ember.computed('documentaries.@each.{budget,boxOffice}', function(){
        var totalProfit=0;
        this.get('documentaries').forEach(documentary => {
            totalProfit+=(Number(documentary.boxOffice)-Number(documentary.budget))
        });

        return totalProfit;
    }),

    actions:{
        validate(){
            this.validate().then(()=>{               
                //this.get('flashMessages').success('Tag Saved');
                Ember.get(this, 'flashMessages').success('Success!');
            }).catch(()=>{
                
                var errorHashes = this.get('errors');
                var errorKeys = Object.keys(errorHashes);
                errorKeys.forEach((key)=>{
                    errorHashes[key].forEach((error)=>{
                        this.get('flashMessages').danger(`${key} ${error}`)
                    })
                })
                this.get('flashMessages').danger(this.get('errors.firstName'));
            });
            
        }
    }
});
