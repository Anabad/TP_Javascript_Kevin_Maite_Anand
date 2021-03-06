'use strict';

const Horaire = require('../../Model/Horaire');
const CST = require('../../Model/Constantes');
const ListeIngredients = ['Steak', 'Jambon', 'Dinde', 'Salade', 'Riz', 'Pates'];

module.exports = class View {
  constructor() {
    this.marcherRungis = new Horaire([5], [14]);
  }

  affichageSimulation() {
    var html = '';
    html = html.concat('<table id="rungis">');
    html = html.concat('<thead>');
    html = html.concat('<tr>');
    html = html.concat('<td id="restau"> Marché de Rungis </td>');
    html = html.concat('</tr>');
    html = html.concat('</thead>');
    html = html.concat('<tbody>');
    html = html.concat('<tr>');
    html = html.concat('<td id="statut_r">Fermé</td>');
    html = html.concat('</tr>');
    html = html.concat('</tbody>');
    html = html.concat('</table>');
    html = html.concat('<table id="horloge">');
    html = html.concat('<thead>');
    html = html.concat('<tr>');
    html = html.concat('<td id="chiffre0" class ="chiffre" >1</td>');
    html = html.concat('<td id="chiffre1" class ="chiffre">8</td>');
    html = html.concat('<td id="chiffre2">:</td>');
    html = html.concat('<td id="chiffre3" class ="chiffre">1</td>');
    html = html.concat('<td id="chiffre4" class ="chiffre">1</td>');
    html = html.concat('</tr>');
    html = html.concat('</thead>');
    html = html.concat('</table>');

    for (var i = 0; i < CST.NOMBRE_DE_RESTAURANT; i++) {
      html = html.concat('<div id="unite">');
      html = html.concat('<table id="restaurant">');
      html = html.concat('<thead>');
      html = html.concat('<tr>');
      html = html.concat('<td id="restau', i, '" class="restau"> Restaurant  </td>');
      html = html.concat('<td id="statut', i, '" class="statut"> Ouvert </td>');
      html = html.concat('</tr>');
      html = html.concat('</thead>');
      html = html.concat('<tbody>');
      html = html.concat('<tr>');
      html = html.concat('<td id="client" colspan="2">');
      html = html.concat('<img id="img', i, '" class="img" src="./IMAGES/people.png" title="client" width="30px">');
      html = html.concat('<div id ="client', i, '">');
      html = html.concat('00');
      html = html.concat('</div>');
      html = html.concat('</td>');
      html = html.concat('</tr>');
      html = html.concat('</tbody>');
      html = html.concat('<tfoot>');
      html = html.concat('<tr>');
      html = html.concat('<td id="score', i, '" class="score" >Score : 00</td>');
      html = html.concat('<td id="scoreJournalier', i, '" class="score" > Score Journalier : 00 </td>');
      html = html.concat('</tr>');
      html = html.concat('</tfoot>');
      html = html.concat('</table>');
      html = html.concat('<table id="stock', i, '" class="stock" colspan="2">');
      html = html.concat('<thead>');
      html = html.concat('<tr>');
      html = html.concat('<td id="ingredients" class="ingredients"> Ingrédients </td>');
      html = html.concat('<td id="quantite" class="quantite"> Quantité </td>');
      html = html.concat('</tr>');
      html = html.concat('</thead>');
      html = html.concat('<tbody>');
      for (var j = 0; j < CST.NOMBRE_TYPE_INGREDIENT; j++) {
        html = html.concat('<tr>');
        html = html.concat('<td id="ingredients', i, j, '" class="ingredients">', ListeIngredients[j], '</td>');
        html = html.concat('<td id="quantite', i, j, '" class="quantite"> 00 </td>');
        html = html.concat('</tr>');
      }
      html = html.concat('</tbody>');
      html = html.concat('</table>');
      html = html.concat('</div>');
    }
    document.body.innerHTML = html;
  }

  setHorloge(heures, minutes) {
    document.getElementById('chiffre0').innerHTML = Math.floor(heures / 10);
    document.getElementById('chiffre1').innerHTML = heures % 10;
    document.getElementById('chiffre3').innerHTML = Math.floor(minutes / 10);
    document.getElementById('chiffre4').innerHTML = minutes % 10;
    var elmt = document.getElementById("statut_r");
    if (this.marcherRungis.estOuvert(heures)) {
      elmt.style.backgroundColor = 'darkgreen';
      elmt.innerHTML = 'Ouvert';
    }
    else {
      elmt.style.backgroundColor = '#b22222';
      elmt.innerHTML = 'Fermé';
    }
  }

  updateIngredient(indice, ingredient) {
    for (var i = 0; i < ingredient.length; i++) {
      document.getElementById('quantite' + indice + i).innerHTML = ingredient[i];
    }
  }

  updateStatut(indice, statut) {
    var elem = document.getElementById('statut' + indice);
    elem.innerHTML = statut;
    statut == 'Ouvert' ? elem.style.color = 'darkgreen' : elem.style.color = 'firebrick';
  }

  updateClientServi(indice, clientServi) {
    document.getElementById('client' + indice).innerHTML = clientServi;
  }

  updateScoreJournalier(indice, score) {
    document.getElementById('scoreJournalier' + indice).innerHTML = 'Score Journalier: ' + score;
  }

  updateScore(indice, score) {
    document.getElementById('score' + indice).innerHTML = 'Score : ' + score;
  }
};

