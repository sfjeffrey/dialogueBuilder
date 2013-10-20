//A script to allow the simple creation of dialogue DAGs including the ability
//to add parameters to weight the likelyness of a particular conversation based 
//on story progress

//common elements
var $addResponse;
var $nextStep;
var $buttonBox;
var $textBox;
var $inputText;
var $finalButton;
var responseMode = false;
var $floatBox;
var $closeButton;
var $tipsButton;
var $reqButton;
var $briefButton;
var $emotion;

var parameterString = 'welp';
var characterString = 'welp';
var healthString    = "welp";
var psychiString    = "welp";
var stockholmString = "welp";
var emotionString   = 'welp';
var briefString     = 'welp';
var tipsString      = "welp";
var reqString       = 'welp';

//The DAG object itself
//Inner DAG constructor
var InnerDAG = function (illicit) {
    this.text       = false;
    this.illicit    = illicit;
    this.emotion    = 'error';
    this.children   = [];
};

//checks if the current object has no text, and if not search its children and 
//their children for the highest DAG with no text. If none found returns false.
InnerDAG.prototype.findHole = function (){
    if( this.text === false ){
        return this;
    }
    for( var i in this.children ){
        var dag = this.children[ i ].findHole();
        if( dag ){
            return dag;
        }
    }
    return false;
};

//Prints this objects data as script to be implemented in the real game.
InnerDAG.prototype.print = function () {
    var text    = this.text;
    var illicit = this.illicit;
    var emotion = this.emotion;
    var children = '';
    for (var i in this.children) {
        children += this.children[i].print()+',';
    }
    children = children.slice(0,children.length-1);
    return '{&#92&quot;text&#92&quot;:&#92&quot;'+text+'&#92&quot;,&#92&quot;illicit&#92&quot;:&#92&quot;'+illicit+'&#92&quot;,&#92&quot;emotion&#92&quot;:&#92&quot;'+emotion+'&#92&quot;,&#92&quot;children&#92&quot;:['+children+']}';
};

//elimintates the response array if there are no responses, and adds a child for
//each response if there are any.
InnerDAG.prototype.fixResponses = function() {
    if (this.responses.length < 1) {
            this.responses = null;
        }else{
            for (var i in this.responses) {
                this.children.push(new InnerDAG());
            }
        }
};

//top level DAG
var masterDAG = new InnerDAG('greeting');
//current DAG
var currentDAG;
//function to add a response to the current dialogue segment
var addResponse = function() {
    var inputText = parseSymbols($inputText.val());
    if ($inputText.val().length > 25) {
        alert('Your response is too long. Make it '+($inputText.val().length - 25)+
        ' characters shorter');
        return;
    }
    if (currentDAG.children.length <= 5) {
        $nextStep.val('Next Dialogue');
        currentDAG.children.push(new InnerDAG($inputText.val()));
        $textBox.append('<br><i>Response '+currentDAG.children.length+' <b>'+$inputText.val()+'</b> added.</i>');
        $inputText.val('');
        
    }else{
        $textBox.append("<br><i>That's enough responses.</i>");
    }
};

//When typing character dialogue this function places what you've typed onto 
//the text box with a promp to write responses. When typing responses this
//function progresses to the next dialogue segment in the first most unfilled
//response. If all responses are filled it finds an unfilled response in the highest
//segment of the conversation
var nextStep = function() {
    if (responseMode) {
        currentDAG = masterDAG.findHole();
        if (!currentDAG) {
            $textBox.html('<i>** The conversation is full. Verify that you parameters are the way you want them. Then Hit finalize to export the data.**<br>**Hit refresh to start another.**</i>');
            $buttonBox.empty();
        }else{
            $nextStep.val('Next Responses');
            $textBox.html('<i>**Your response was**</i><br><b>'+currentDAG.illicit+'</b><br><i>**So they will say...**</i>');
            $emotion.val('');
            $inputText.val('');
            $addResponse.remove();
            responseMode = false;
        }
    }else{
        if ($inputText.val().length > 486) {
            alert('Your dialogue is too long. Make it '+($inputText.val().length - 486)+
            ' characters shorter');
            return;
        }
        if ($emotion.val() === '') {
            alert('You need to set an emotion');
            return;
        }
        var inputText = $inputText.val();
        $textBox.html('<i>**They said**</i><br><b>'+inputText+'</b><br><i>**To which you could say...**</i>');
        currentDAG.text = parseSymbols(inputText);
        currentDAG.emotion = $emotion.val();
        $inputText.val('');
        $nextStep.val('Close Branch');
        $buttonBox.append($addResponse);
        $addResponse.click(addResponse);
        responseMode = true;
        
    }
};

//function finalizes the DAG information and outputs it into the output box.
var finalizeDAG = function() {
    if($('#character').val() === '') {
        alert('You must select a character');
        return;
    }
    
    var owner       = $('#character').val();
    var minHealth   = $('#minHealth').val();
    var maxHealth   = $('#maxHealth').val();
    var minPsychi   = $('#minPsychi').val();
    var maxPsychi   = $('#maxPsychi').val();
    var minStock    = $('#minStock').val();
    var maxStock    = $('#maxStock').val();
    var twiKid      = $('input:radio[name=twiKid]:checked').val();
    var appKid      = $('input:radio[name=appKid]:checked').val();
    var fluKid      = $('input:radio[name=fluKid]:checked').val();
    var dasKid      = $('input:radio[name=dasKid]:checked').val();
    var rarKid      = $('input:radio[name=rarKid]:checked').val();
    
    minHealth = minHealth < 0 ? 0 : minHealth;
    minHealth = minHealth > 100 ? 100 : minHealth;
    maxHealth = maxHealth < 0 ? 0 : maxHealth;
    maxHealth = maxHealth > 100 ? 100 : maxHealth;
    minPsychi = minPsychi < 0 ? 0 : minPsychi;
    minPsychi = minPsychi > 100 ? 100 : minPsychi;
    maxPsychi = maxPsychi < 0 ? 0 : maxPsychi;
    maxPsychi = maxPsychi > 100 ? 100 : maxPsychi;
    minStock = minStock < 0 ? 0 : minStock;
    minStock = minStock > 100 ? 100 : minStock;
    maxStock = maxStock < 0 ? 0 : maxStock;
    maxStock = maxStock > 100 ? 100 : maxStock;
    
    if (!masterDAG.text) {
        alert('There must be at least an opening dialogue.');
        return;
    }
    if (owner === 'twilight' && twiKid === 'null') {
        alert('Twilight must be set to either "bound" or "free"');
        return;
    }
    if (owner === 'applejack' && appKid === 'null') {
        alert('Applejack must be set to either "bound" or "free"');
        return;
    }
    if (owner === 'fluttershy' && fluKid === 'null') {
        alert('Fluttershy must be set to either "bound" or "free"');
        return;
    }
    if (owner === 'rainbowdash' && dasKid === 'null') {
        alert('Rainbowdash must be set to either "bound" or "free"');
        return;
    }
    if (owner === 'rarity' && rarKid === 'null') {
        alert('Rarity must be set to either "bound" or "free"');
        return;
    }
    if (maxStock < minStock) {
        alert('Stockholm maximum must be more than the minimum');
        return;
    }
    if (maxHealth < minHealth) {
        alert('Health maximum must be more than the minimum');
        return;
    }
    if (maxPsychi < minPsychi) {
        alert('Psychi maximum must be more than the minimum');
        return;
    }
    $('.output').html('');
    var output = ('\'{&#92&quot;owner&#92&quot;:&#92&quot;'+owner+'&#92&quot;,&#92&quot;parameters&#92&quot;:['+twiKid+','+dasKid+','+appKid+','+
        fluKid+","+rarKid+","+maxHealth+","+minHealth+","+maxPsychi+","+minPsychi
        +","+maxStock+","+minStock+'],&#92&quot;dialogue&#92&quot;:'+masterDAG.print()+'}\'');
    $('.output').append(output);
    masterDAG = new InnerDAG('greeting');
    
};

var parseSymbols = function (string) {
    string = string.replace(/</g,'&lt;');
    string = string.replace(/"/g,'&#92&#92&#92&quot;');
    string = string.replace(/'/g,'&#92&#92&#92&#39;');
    return string;
};
//****************************************************************************
//document ready function
//****************************************************************************
$(document).ready(function(){
    $addResponse = $('#addResponse');
    $nextStep    = $('#nextStep');
    $buttonBox   = $('#buttonBox');
    $textBox     = $('.textBox');
    $inputText   = $('.inputText');
    $finalButton = $('#finalButton');
    $floatBox    = $('.floatBox');
    $tipsButton  = $('input[value*="Tips"]');
    $reqButton   = $('input[value*="Requirments"]');
    $briefButton = $('input[value*="Briefing"]');
    $emotion     = $('#emotion');
    
    parameterString = $('#parameterString').html();
    characterString = $('#characterString').html();
    healthString    = $('#healthString').html();
    psychiString    = $('#psychiString').html();
    stockholmString = $('#stockholmString').html();
    emotionString   = $('#emotionString').html();
    briefString     = $('#briefString').html();
    tipsString      = $('#tipsString').html();
    reqString       = $('#reqString').html();
    
    $('.explenationText').remove();
    
    $addResponse.remove();
    $floatBox.remove();
    $tipsButton.click ( function() {
        $('body').append($floatBox);
        $floatBox.html(tipsString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $reqButton.click ( function() {
        $('body').append($floatBox);
        $floatBox.html(reqString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $briefButton.click ( function() {
        $('body').append($floatBox);
        $floatBox.html(briefString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $briefButton.click();
    //$addResponse.click(addResponse);
    $nextStep.click(nextStep);
    $finalButton.click(finalizeDAG);
    currentDAG = masterDAG;
    $('#expParameters').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(parameterString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $('#expCharacter').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(characterString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $('#expHealth').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(healthString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $('#expPsychi').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(psychiString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $('#expStockholm').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(stockholmString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
    $('#expEmotion').click ( function() {
        $('body').append($floatBox);
        $floatBox.html(emotionString+'<div class="closeButton">X</div>');
        $('.closeButton').click( function() { $(this).parent().remove(); });
    });
        
        
        
});