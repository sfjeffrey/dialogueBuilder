var currentdialogue = {};



var converse = function () {

            //function for response buttons
            var respond = function(){
                var N = $(this).data('value');
                currentdialogue = currentdialogue.children[N];
                stage.gameMessage(currentdialogue.text);
                stage.setChoices();
                for (var i in currentdialogue.children){
                    $('.buttonBox').append('<div class="button" id="response'+i+'">'+
                        currentdialogue.children[i].illicit+'</div>');
                    $('#response'+i).data('value', i);
                    $('#response'+i).click(respond);
                }
            };
            var $json = $('.json').val();
            if ($json === '') {
                currentdialogue = JSON.parse(defaultConversation).dialogue;
            }
            else {
                var dialogue = $('.json').val().replace(/\\"/g,'"').replace(/\\\\"/g,'\\"')
                console.log(dialogue);
                currentdialogue = JSON.parse(dialogue).dialogue;
            }
            stage.gameMessage(currentdialogue.text);
            stage.setChoices();
            for (var i in currentdialogue.children){
                    $('.buttonBox').append('<div class="button" id="response'+i+'">'+
                        currentdialogue.children[i].illicit+'</div>');
                    $('#response'+i).data('value', i);
                    $('#response'+i).click(respond);
                }
    };




var defaultConversation = '{\"owner\":\"twilight\",\"parameters\":[false,null,null,null,null,100,0,100,0,100,0],\"dialogue\":{\"text\":\"So this is the default dialogue. Hopefully it\'ll show you how extensive dialogue can be in CT:CiM.\",\"illicit\":\"greeting\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"You can either chat with me or you can go back and write your own dialogue with the dialogueMaker.\",\"illicit\":\"Now what?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Go ahead and hit the back button in the upper right corner. Hope you have fun!\",\"illicit\":\"OK I\'ll do that.\",\"emotion\":\"neutral\",\"children\":[]},{\"text\":\"The tool may be a bit complicated, but there\'s lots of help documents and tips on the page. Just in case though I\'ll explain it here as well.\",\"illicit\":\"How do I do that?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"First you type the <i>Greeting</i> which is what is said when you first click on the talk button in the real game. It was also the first thing I said to you in this conversation!\",\"illicit\":\"Shoot\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Then you click <i>Next Step</i> and it will ask you to type out the responses to the greeting. The <i>responses</i> are the text that go into the little buttons. So make them short and to the point. Don\'t think of them as what you are actually saying but the idea of what you\'re saying.\",\"illicit\":\"uh huh\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"When you\'re done typing a response click \\\"Next Response\\\" to write another one. When you\'re finished click \\\"Next Dialogue\\\". Now you type the character\'s response to your response to them. To help keep you from getting confused the prompt will let you know who\'s talking to who and in response to what at each step.\",\"illicit\":\"uh huh\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"All that crazy stuff around the prompt are the parameters. Each one has a little explanation button to tell you what they do. If one of them isn\'t right you\'ll get a warning message so you can\'t accidentally make a broken conversation.\",\"illicit\":\"What about these buttons?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"<pinky>How do I make it so that I, the player, can say more than what fits in the button?</pinky> That\'s a good question. the answer is the <i>pinky</i> tag. Just begin Pinky\'s dialogue with &lt;pinky> and end it with &lt;/pinky> and that\'s it. You can even mix Pinky\'s words in with the character\'s words, Kind of like right now! <pinky>WOW</pinky>\",\"illicit\":\"I want to say more...\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"The tool looks for unfinished <i>branches</i> in the <i>dialogue tree</i>. When it spots one it tells you to extend it with responses. If you click <i>Close Branch</i> before typing ANY responses the tool knows this line of dialogue is over, and in the game the conversation will end.\",\"illicit\":\"How do I finish?\",\"emotion\":\"neutral\",\"children\":[]}]}]}]}]}]}]},{\"text\":\"What about?\",\"illicit\":\"I wanna chat!\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"An interesting question. I just got some inspiration for a game I thought would be fun and sexy. I began making it just for something to do, but to my surprise I actually finished a part. So I made another, and another.\",\"illicit\":\"Why make this game?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Well like I said I was inspired and my inspiration included the sexual themes. I could have just as easily made the secret ingredient <i>pixie powder</i> or something gay like that, but that\'s not what I wanted to do.\",\"illicit\":\"Yeah but why porn?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Well I guess that\'s just what I like. I get that I\'m closing doors by A) making it porn, and B) making it weird porn. But I\'m just not worried about that. I think the game will be fun and that people will like it regardless if they play it <i>one handed</i> or not.\",\"illicit\":\"Why so deviant?\",\"emotion\":\"neutral\",\"children\":[]}]},{\"text\":\"Well I do, but I wanted to make a game, and if I\'m going to make a game I want something more elaborate than just <i>Play minesweeper to see a picture</i>. I think people view sexual themes as an indicator of a lack of effort and others view sexual themes as an excuse for a lack of effort. I wish to change both those views.\",\"illicit\":\"Why not just make porn?\",\"emotion\":\"neutral\",\"children\":[]}]},{\"text\":\"Why did I make it pony themed? When I could have made some sort of dungeon dick girl baking game with any other theme? This isn\'t the only game I plan on making, it just happened to be the one I had the most in site into how to make at the time. I in know way plan on only making pony games.\",\"illicit\":\"Why make it Ponies?\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Egh. I don\'t consider myself a brony in the strictest sense. I\'m just passionate about cartoon porn.\",\"illicit\":\"Whew!\",\"emotion\":\"neutral\",\"children\":[]},{\"text\":\"Cuz there\'s a whole big world out there. I have original themes in mind too. There could be another Pony game in the future, but it all depends on what inspires me.\",\"illicit\":\"Aw why not?\",\"emotion\":\"neutral\",\"children\":[]}]}]}]},{\"text\":\"Yup. I made this using the dialogue maker tool. It makes the process accessible to non-programmers, and honestly programming a dialogue tree by hand isn\'t exactly a picnic even if you know how.\",\"illicit\":\"Pretty neat.\",\"emotion\":\"neutral\",\"children\":[]},{\"text\":\"Why?\",\"illicit\":\"This is dumb.\",\"emotion\":\"neutral\",\"children\":[{\"text\":\"Trust me, this isn\'t going to be one of those <i>perform menial task to earn mediocre porn</i> or <i>complete shallow dating sim to get uninteresting dress up game</i>. My priority is to make a fun game and to make sex integrate into it. If that doesn\'t sound good then it\'s probably just not your cup of tea.\",\"illicit\":\"it\'s a game.\",\"emotion\":\"neutral\",\"children\":[]},{\"text\":\"I haven\'t heard of any in depth Pony fan games, and you might be upset to find out that this one is steeped in deviant porn. If so then, sorry but that\'s what I wanted to do.\",\"illicit\":\"it\'s porn\",\"emotion\":\"neutral\",\"children\":[]},{\"text\":\"Well I plan on making more games about different things. Ponies are not my exclusive interest.\",\"illicit\":\"it\'s ponies\",\"emotion\":\"neutral\",\"children\":[]}]}]}}';