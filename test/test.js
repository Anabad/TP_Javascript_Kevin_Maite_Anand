/**
 * Created by Anand on 02/04/2016.
 */
var should = require('chai').should();
var assert = require('chai').assert;
var chai = require('chai');
var Horloge = require('../Model/Horloge');
var Client = require('../Model/Client');
var Stock = require('../Model/Stock');
var CST = require('../Model/Constantes');
var Utile = require('../Model/fonctionsUtiles');
var Horaire = require('../Model/Horaire');
var Restaurant = require('../Model/Restaurant');
var Model = require('../Model/Model');
var Event = require('../Model/Event');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
    });
  });
});
describe('Horloge', ()=> {
  describe('#modifierDate()', ()=> {
    it('should set minute to 1', ()=> {
      var h = new Horloge();
      h.modifierDate();
      h.minute.should.equal(1);
    });
    it('should set minute to 0 and heure to 1', ()=> {
      var h = new Horloge();
      h.minute = 99;
      h.modifierDate();
      h.minute.should.equal(0);
      h.heure.should.equal(1);
    });
    it('should set minute to 0 and heure to 0', ()=> {
      var h = new Horloge();
      h.minute = 99;
      h.heure = 23;
      h.modifierDate();
      h.minute.should.equal(0);
      h.heure.should.equal(0);
    });
    it('should return h.minute', ()=> {
      var h = new Horloge();
      h.modifierDate().should.equal(h.minute);
    });
  });
});
describe('Client', () => {
  describe('#choixRepas(listeRepasDispo)', () => {
    it('should return random element of list', () => {
      var list = [1, 2, 3, 4, 5, 6];
      list.should.contain(Client.choixRepas(list));
    });
  });
});
describe('Stock', () => {
  var testStock = new Stock();
  describe('#statut(statut)', () => {
    it('should set _statut to test', () => {
      var testStatut = "test";
      testStock._statut = "none";
      testStock.statut(testStatut);
      testStock._statut.should.equal(testStatut);
    });
    it('should call ravitaillement() and return 1', () => {
      var testStatut = "DistribuerRavitailler";
      testStock._statut = "none";
      testStock.statut(testStatut).should.equal(1);
    });
    it('should do nothing and return 0', () => {
      var testStatut = "DistribuerRavitailler";
      testStock._statut = "DistribuerRavitailler";
      testStock.statut(testStatut).should.equal(0);
    });
  });
  describe('#initialiserIngredient()', ()=> {
    var testTab = testStock.initialiserIngredient();
    it('should return an Array ', () => {
      testTab.should.be.an('Array');
    });
    it(`should be of length ${CST.NOMBRE_TYPE_INGREDIENT}` ,()=>{
      testTab.should.have.length(CST.NOMBRE_TYPE_INGREDIENT);
    } );
    it(`should contain only the value ${CST.STOCK_DEPART}`,()=>{
      var i;
      var expected = Array(CST.NOMBRE_TYPE_INGREDIENT);
      for (i = 0; i< testTab.length;i++) {
        expected[i] = CST.STOCK_DEPART;
      }
      testTab.should.deep.equal(expected);
    });
  });
  /*describe('#ravitaillement()',()=>{
    var testStock = new Stock();
    it(`should set all values of ingredient to ${CST.STOCK_DESIRE}`,(done)=>{
      for (i = 0; i< testStock.ingredients.length;i++) {
        testStock.ingredients[i] = 10;
      }
      testStock.statutMarcher = 'Ouvert';
      testStock.ravitaillement(done);
      var i;
      for (i = 0; i< testStock.ingredients.length;i++) {
        testStock.ingredients[i].should.equal(CST.STOCK_DESIRE);
      }
    });
  });*/
  describe('#resteAssezIngredient(test,option)',()=>{
    it(`should return true when all elements are above ${CST.SEUIL_CRITIQUE}`,()=>{
      testStock.initialiserIngredient();
      testStock.resteAssezIngredient(null).should.equal(true);
    });
    it(`should return false when one element is below ${CST.SEUIL_CRITIQUE}`,()=>{
      testStock.ingredients[0] = CST.SEUIL_CRITIQUE - 1;
      testStock.resteAssezIngredient(null).should.equal(false);
    });
    it(`should return true when element at index 1 is above ${CST.SEUIL_CRITIQUE}`,()=>{
      testStock.ingredients[1] = CST.SEUIL_CRITIQUE + 1;
      testStock.resteAssezIngredient(1,'Indice').should.equal(true);
    });
    it(`should return false when element at 0 is below ${CST.SEUIL_CRITIQUE}`,()=>{
      testStock.ingredients[0] = CST.SEUIL_CRITIQUE - 1;
      testStock.resteAssezIngredient(0,'Indice').should.equal(false);
    });
    it('should return false when there are not enough ingredients to make recipe',()=>{
      testStock.ingredients[0] = 0;
      var recette = [1,0,0,0,0];
      testStock.resteAssezIngredient(recette,'Recette').should.equal(false);
    });
    it('should return true when there are enough ingredients to make the recipe',()=>{
      var recette = [0,1,1,1,1];
      testStock.resteAssezIngredient(recette,'Recette').should.equal(true);
    });
  });
  describe('#retirerIngredients(recette)',()=>{
    it('should return true',()=>{
      for(var i = 0; i < testStock.ingredients.length;i++){
        testStock.ingredients[i] = 1;
      }
      testStock.retirerIngredients([1,1,1,0,0]).should.equal(true);
    });
    it(`ingredients should equal [0,0,0,1,1]`,()=>{
      for(var i = 0; i < testStock.ingredients.length;i++){
        testStock.ingredients[i] = 1;
      }
      testStock.retirerIngredients([1,1,1,0,0]);
      testStock.ingredients.should.deep.equal([0,0,0,1,1]);
    });
  });
});
describe('fonctionsUtiles',()=>{
  describe('#getRandom(min,max)',()=>{
    it('should return a number',()=>{
      Utile.getRandom(1,10).should.be.a('number');
    });
    it('should be between 1 and 10',()=>{
      Utile.getRandom(1,10).should.be.within(1,10);
    });
  });
  describe('#creationTableau(taille,valeur)',()=>{
    testTab = Utile.creationTableau(10,10);
    it('should return an Array ', () => {
      testTab.should.be.an('Array');
    });
    it(`should be of length 10` ,()=>{
      testTab.should.have.length(10);
    } );
    it(`should contain only the value 10`,()=>{
      testTab.should.deep.equal([10,10,10,10,10,10,10,10,10,10]);
    });
  });
  describe('#remplirTableauAleatoire(tab,min,max)',()=>{
    testRemp = Utile.creationTableau(3,20);
    Utile.remplirTableauAleatoire(testRemp,1,10);
    it('should return an Array ', () => {
      testRemp.should.be.an('Array');
    });
    it(`should be of length 3` ,()=>{
      testRemp.should.have.length(3);
    } );
    it('should contain values within 1 and 10',()=>{
      testRemp[0].should.be.within(1,10);
    });
    it('should contain values within 1 and 10',()=>{
      testRemp[1].should.be.within(1,10);
    });
    it('should contain values within 1 and 10',()=>{
      testRemp[2].should.be.within(1,10);
    });
  });
});
describe('Horaire',()=>{
  describe('#estOuvert(heure)',()=>{
    var testHoraire = new Horaire([10],[20]);
    it('should return true when heure is between 10 and 20',()=>{
      testHoraire.estOuvert(12).should.equal(true);
    });
    it('should return true when heure is 10',()=>{
      testHoraire.estOuvert(10).should.equal(true);
    });
    it('should return false when heure is not between 10 and 20',()=>{
      testHoraire.estOuvert(8).should.equal(false);
    });
    it('should return false when heure is 20',()=>{
      testHoraire.estOuvert(20).should.equal(false);
    });

    var testHoraire2 = new Horaire([6,14],[12,21]);
    it('should return true when heure is between 6 and 12',()=>{
      testHoraire2.estOuvert(11).should.equal(true);
    });
    it('should return true when heure is between 14 and 21',()=>{
      testHoraire2.estOuvert(16).should.equal(true);
    });
    it('should return true when heure is 6',()=>{
      testHoraire2.estOuvert(6).should.equal(true);
    });
    it('should return true when heure is 14',()=>{
      testHoraire2.estOuvert(14).should.equal(true);
    });
    it('should return false when heure is below 6',()=>{
      testHoraire2.estOuvert(4).should.equal(false);
    });
    it('should return false when heure is above 21',()=>{
      testHoraire2.estOuvert(23).should.equal(false);
    });
    it('should return false when heure is between 12 and 14',()=>{
      testHoraire2.estOuvert(13).should.equal(false);
    });
    it('should return false when heure is 12',()=>{
      testHoraire2.estOuvert(12).should.equal(false);
    });
    it('should return false when heure is 21',()=>{
      testHoraire2.estOuvert(21).should.equal(false);
    });
  });
  describe('#nobreHeureFermeture()',()=>{
    var testHoraireFermeture = new Horaire([6,14],[12,21]);
    it('should return 11',()=>{
      testHoraireFermeture.nombreHeureFermeture().should.equal(11);
    });
    var testHoraireFermeture2 = new Horaire([6],[21]);
    it('should return 9',()=>{
      testHoraireFermeture2.nombreHeureFermeture().should.equal(9);
    });
  });
});
describe('Restaurant', ()=> {
  var testRestaurant = new Restaurant(0,new Horaire([6],[21]));
  describe('#statut(statut)',()=>{
    it('should set statut to test',()=>{
      testRestaurant.statut('test');
      testRestaurant._statut.should.equal('test');
    });
  });
  describe('#getStatut()',()=>{
    it('should return test',()=>{
      testRestaurant.statut('test');
      testRestaurant.getStatut().should.equal('test');
    });
    it('should emit an updateStatut event ', function(done){
      var eventFired = false;
      setTimeout(function () {
        assert(eventFired, 'Event did not fire in 1000 ms.');
        done();
      }, 1000); //timeout with an error in one second
      testRestaurant.event.on('updateStatut',function(){
        eventFired = true;
      });
      testRestaurant.statut('test2');
    });
  });
  describe('#clientServi()',()=>{
    it('should emit a clientServi event ', function(done){
      var eventFired = false;
      setTimeout(function () {
        assert(eventFired, 'Event did not fire in 1000 ms.');
        done();
      }, 1000); //timeout with an error in one second
      testRestaurant.event.on('clientServi',function(){
        eventFired = true;
      });
      testRestaurant.clientServi();
    });
    it('should set _servi to 1',()=>{
      testRestaurant._servi = 0;
      testRestaurant.clientServi();
      testRestaurant._servi.should.equal(1);
    });
  });
  describe('#scorer(score)',()=>{
    it('should set score to 5',()=>{
      testRestaurant._score = 0;
      testRestaurant.scorer(5);
      testRestaurant._score.should.equal(5);
    });
    it('should set score to 10',()=>{
      testRestaurant._score = 5;
      testRestaurant.scorer(5);
      testRestaurant._score.should.equal(10);
    });
    it('should emit a scorer event ', function(done){
      var eventFired = false;
      setTimeout(function () {
        assert(eventFired, 'Event did not fire in 1000 ms.');
        done();
      }, 1000); //timeout with an error in one second
      testRestaurant.event.on('scorer',function(){
        eventFired = true;
      });
      testRestaurant.scorer(1);
    });
  });
  describe('#scorerJournalier(score)',()=>{
    it('should set scoreJournalier to 18',()=>{
      testRestaurant._scoreJournalier = 9;
      testRestaurant.scorerJournalier(1);
      testRestaurant._scoreJournalier.should.equal(18);
    });
    it('should emit a scorerJournalier event ', function(done){
      var eventFired = false;
      setTimeout(function () {
        assert(eventFired, 'Event did not fire in 1000 ms.');
        done();
      }, 1000); //timeout with an error in one second
      testRestaurant.event.on('scorerJournalier',function(){
        eventFired = true;
      });
      testRestaurant.scorerJournalier(1);
    });
    it('should return true',()=>{
      testRestaurant.scorerJournalier(1).should.equal(true);
    });
  });
  describe('#creerRecette()',()=>{
    it('should be an Array',()=>{
      testRestaurant.creerRecette().should.be.an('Array');
    });
    it('should contain Arrays',()=>{
      testRestaurant.creerRecette()[0].should.be.an('Array');
    })
    it(`should be between ${CST.NOMBRE_DE_RECETTE_MIN} and ${CST.NOMBRE_DE_RECETTE_MAX} in length`,()=>{
      testRestaurant.creerRecette().length.should.be.within(CST.NOMBRE_DE_RECETTE_MIN,CST.NOMBRE_DE_RECETTE_MAX);
    });
    it(`contents should be of length ${CST.NOMBRE_TYPE_INGREDIENT}`,()=>{
      testRestaurant.creerRecette()[0].length.should.equal(CST.NOMBRE_TYPE_INGREDIENT);
    });
    it('should not contain a list of 0s',()=>{
      var testRecette = Array(CST.NOMBRE_TYPE_INGREDIENT);
      for(var i; i < CST.NOMBRE_TYPE_INGREDIENT;i++ ){
        testRecette[i] = 0;
      }
      testRestaurant.creerRecette().should.not.contain(testRecette);
    });
  });
  describe('#testRecetteVide(recette)',()=>{
    it('should return false',()=>{
      testRestaurant.testRecetteVide([0,0,0,0,1]).should.equal(false);
    });
    it('should return true',()=>{
      testRestaurant.testRecetteVide([0,0,0,0,0]).should.equal(true);
    });
  });
  describe('#listeRepasDispo()',()=>{
    it('should be an Array',()=>{
      testRestaurant.listeRepasDispo().should.be.an('Array');
    });
  });
  describe('#possibiliteServir(heure)',()=>{
    it('should return true when open and has at least one recipe',()=>{
      testRestaurant.stock.ingredients = [1,1,1,1,1];
      testRestaurant.creerRecette();
      testRestaurant.possibiliteServir(12).should.equal(true);
    });
    it('should return false when open and has no recipes',()=>{
      testRestaurant.stock.ingredients = [0,0,0,0,0];
      testRestaurant.creerRecette();
      testRestaurant.possibiliteServir(12).should.equal(false);
    });
    it('should return false when closed and has at least one recipe',()=>{
      testRestaurant.stock.ingredients = [1,1,1,1,1];
      testRestaurant.creerRecette();
      testRestaurant.possibiliteServir(1).should.equal(false);
    });
  });
  describe('#servirClient(client)',()=>{
    var testClient = new Client();
    it('should have less ingredients after',()=>{
      var Before = 0;
      var After = 0;
      for(var i=0;i<testRestaurant.stock.ingredients.length;i++){
        Before += testRestaurant.stock.ingredients[i];
      }
      testRestaurant.servirClient(testClient);
      for(i=0;i<testRestaurant.stock.ingredients.length;i++){
        After += testRestaurant.stock.ingredients[i];
      }
      Before.should.be.above(After);
    });
  });
});
