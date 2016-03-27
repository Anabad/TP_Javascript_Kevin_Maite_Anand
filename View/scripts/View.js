'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = class View{
  constructor(){

  }
  affichageSimulation(){
    var html='';
    html = html.concat('<table id="rungis">');
    html = html.concat('<thead>');
    html = html.concat('<tr>');
    html = html.concat('<td id="restau"> Marché de Rungis </td>');
    html = html.concat('</tr>');
    html = html.concat('</thead>');
    html = html.concat('<tbody>');
    html = html.concat('<tr>');
    html = html.concat('<td id="statut_r"> Ouvert </td>');
    html = html.concat('</tr>');
    html = html.concat('</tbody>');
    html = html.concat('</table>');
    html = html.concat('<p id="horloge"> 00:00</p>');
    html = html.concat('<div id="unite">');
    html = html.concat('<table id="restaurant">');
    html = html.concat('<thead>');
    html = html.concat('<tr>');
    html = html.concat('<td id="restau"> Restaurant  </td>');
    html = html.concat('<td id="statut"> Ouvert </td>');
    html = html.concat('</tr>');
    html = html.concat('</thead>');
    html = html.concat('<tbody>');
    html = html.concat('<tr>');
    html = html.concat('<td id="client" colspan="2">');
    html = html.concat('<img id="img" src="./IMAGES/people.png" title="client" width="30px">');
    html = html.concat('00');
    html = html.concat('</td>');
    html = html.concat('</tr>');
    html = html.concat('</tbody>');
    html = html.concat('<tfoot>');
    html = html.concat('<tr>');
    html = html.concat('<td id="score" colspan="2"> Score : 00 </td>');
    html = html.concat('</tr>');
    html = html.concat('</tfoot>');
    html = html.concat('</table>');
    html = html.concat('<table id="stock" colspan="2">');
    html = html.concat('<thead>');
    html = html.concat('<tr>');
    html = html.concat('<td id="ingredients"> Ingrédients </td>');
    html = html.concat('<td id="quantite"> Quantité </td>');
    html = html.concat('</tr>');
    html = html.concat('</thead>');
    html = html.concat('<tbody>');
    html = html.concat('<tr>');
    html = html.concat('<td id="ingredients">...</td>');
    html = html.concat('<td id="quantite"> 00 </td>');
    html = html.concat('</tr>');
    html = html.concat('</tbody>');
    html = html.concat('</table>');
    html = html.concat('</div>');
    html = html.concat('<br><br>');
    document.body.innerHTML = html;
    //document.write(heure);
  }

  setHorloge(heure,minute){
    var h='';
    heure<10 ? h='0' : h='';
    var m='';
    minute<10 ? m='0' : m='';
    document.getElementById('horloge').innerHTML = h+heure+':'+m+minute;
  }
};
