var harvestGameObject   = harvestGameObject || null;
var petGameObject       = petGameObject     || null;
var shopGameObject      = shopGameObject    || null;
var storeGame           = storeGame         || null;
var player              = player            || null;
var Creature            = Creature          || null;
var gameState           = gameState         || null;
var characters          = characters        || null;
var Shop                = Shop              || null;
var WorldList           = WorldList         || null;
var BasicItem           = BasicItem         || null;
var Character           = Character         || null;
var mapList             = mapList           || null;

var stage = {};
//this function sets the buttons in the button box and gives them a click function
//first argument is an array of strings. Second is a function carried by the
//button. Each string is the ID and the DATA of that button. All buttons enact the
//same function.
stage.setChoices = function (choices, func){
    $('.buttonBox').empty();
    for (var i in choices){
        $('.buttonBox').append('<div class="button" id="'+choices[i]+'">'+choices[i]+'</div>');
        $('#'+choices[i]).data('value', choices[i]);
        $('#'+choices[i]).click(func);
        
    }
};

//Like setChoices, but does not empty the buttonBox first. Can be used to add
//multiple buttons with the same function, or buttons with different functions
//one at a time.
stage.addChoices = function (choices, func, value){
    value = value || choices;
    var name = choices;
    choices = choices.toString();
    while ( typeof name === 'string' && name.contains(' ')) {
        name = name.replace(' ','_');
    }
    $('.buttonBox').append('<div class="button" id="'+name+'">'+choices+'</div>');
    $('#'+name).data('value', value);
    $('#'+name).click(func);
    if (WorldList.base[choices] instanceof BasicItem) {
        $('#'+choices).html( WorldList.base[choices].name);
    }
    if (characters[choices] instanceof Character) {
        $('#'+choices).html( characters[choices].name);
    }
};

//function adds messages to the text box.
stage.gameMessage = function (string){
    if ($('.textBox').children().length > 30){
        $($('.textBox').children()[0]).remove();
    }
    $('.textBox').append('<div>'+string+'</div>');
};


//****************************************************************************
//document ready function
//****************************************************************************
$(document).ready(function(){
    stage.setChoices(['Start'],converse);
        
});