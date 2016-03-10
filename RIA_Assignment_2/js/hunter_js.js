// Rich Internet Applications - Assignment #2
// Christian Hernon, W0223388
(function () {
    //<editor-fold desc="Create HTML Elements">
    $('<div>', {id: 'playingArea'}).appendTo('body');
    $('<div>', {id: 'ctrlArea'}).appendTo('body');
    $('<img>', {class: 'hide'}).appendTo('#playingArea');
    $('<div>', {id: 'buttonArea'}).appendTo('#ctrlArea');
    $('<div>', {id: 'gallery'}).appendTo('#ctrlArea');
    $('<div>', {id: 'garbageBin'}).appendTo('#ctrlArea');
    $('<div>', {id: 'shootingArea'}).appendTo('body');
    $('<div>', {id: 'scoreArea'}).appendTo('body');
    $('<p>Missed Characters</p>').appendTo('#scoreArea');
    $('<p>', {id: 'missedCharacters'}).appendTo('#scoreArea');
    $('<img>', {
        src: '../img/gun.png',
        id: 'gun',
        alt: 'gun',
        height: $('#shootingArea').height(),
        dblclick: fireBullet
    }).appendTo('#shootingArea');
    $('<img>', {src: '../img/bullet.png', id: 'bullet', height: '50px', class: 'hide'}).appendTo('#playingArea');
    $('<img>', {src: '', id: 'target', width: '125px', height: '125px', class: 'hide'}).appendTo('#playingArea');
    //</editor-fold>

    var $bullet = $('#bullet'),
        $target = $('#target'),
        $missedTargets = 0,
        $characters;

    $('<input>', {
        type: 'button',
        value: 'Add BackGround',
        click: function () {
            var path = prompt('Enter path of the image');
            if (path && path.trim() != "") {
                $(this).val('Change Background');

                $('#playingArea>img').first().replaceWith(
                    $('<img>', {
                        src: path,
                        dblclick: fadeMe,
                        width: $('#playingArea').width(),
                        height: $('#playingArea').height(),
                        alt: 'backGround'
                    }));
            }
        }
    }).appendTo('#buttonArea');

    function fadeMe(event) {
        $(this).fadeOut('slow');
    }

    //Add
    $('<input>', {
        type: 'button',
        value: 'Load Characters',
        click: function () {
            $(this).prop("disabled", true);
            loadImages();
            $('#start').prop('disabled', false);
        }
    }).appendTo('#buttonArea');

    //Add Start Game Button
    $('<input>', {
        id: 'start',
        type: 'button',
        value: 'Start Game',
        disabled: true,
        click: function () {
            $('.character').draggable({disabled: true});
            $characters = $('#gallery').children();
            newTarget();
        }
    }).appendTo('#buttonArea');

    //this technique minimize the number of failure loading trip to one.
    var imgNum = 1;

    function loadImages() {
        $.get('../img/' + imgNum + '.png', function (data) {
            imgNum++;
            loadImages();
        }).fail(function () {

            for (var i = 1; i < imgNum; i++) {
                $('#ctrlArea').children().eq(1).append(
                    $('<img>', {
                        src: '../img/' + i + '.png',
                        class: 'character',
                        border: '1px white solid',
                        alt: 'thumbnail'
                    })
                );
            }
            //solve problem of dragging object outside a scrolling div
            $('.character').draggable({
                helper: 'clone',
                cursor: "crosshair",
                opacity: 0.35,
                stop: function (event, ui) {
                    $('#playingArea').append($(this));
                    $(this).css({
                        left: event.pageX,
                        top: event.pageY,
                        position: 'absolute'
                    });

                    $(this).draggable("option", {
                        helper: 'original',
                        opacity: 1
                    });
                }
            });
            $('.character').mouseup(examineErase)
        });
    }

    function newTarget() {
        if ($characters.length > 0) {
            $target.show();
            var i = Math.floor(Math.random() * $characters.length);
            $target.attr('src', $characters.eq(i).attr('src'));
            $characters[i].remove();
            $characters.splice(i, 1);
            moveTarget();
        } else {
            //call the endGame function
            console.log('game over');
            gameComplete();
        }
    }// end newTarget

    function moveTarget() {
        $target.animate({left: '92%'}, 7000, function () {
            $missedTargets++;
            $('#missedCharacters').text($missedTargets);
            $target.hide('explode', {pieces: 32, complete: resetTarget}, 500);
        });
    }// end moveTarget

    function resetTarget() {
        $target.css('left', '0');
        newTarget();
    }// end resetTarget

    //make gun draggable
    $('#gun').draggable({
        containment: 'parent',
        snap: 'parent'
    });

    //fire a bullet on click
    function fireBullet() {
        var myBullet = $('#bullet'),
            yOffset = $('#playingArea').height() - myBullet.height(),
            myGun = $('#gun'),
            xOffset = myGun.offset().left;
        myBullet.toggleClass('hide');
        myBullet.css('top', yOffset);
        myBullet.css('left', xOffset);
        animateBullet();
    }

    function animateBullet() {
        $('#bullet').animate({top: '0'}, {progress: detectCollision, complete: resetBullet}, 750);
    }

    function resetBullet() {
        $bullet.toggleClass('hide');
    }

    $('#ctrlArea').children().eq(1).css({
        overflow: 'auto',
        height: '60%'
    });

    function detectCollision() {
        var t_bottom = $target.offset().top + $target.height(),
            t_left = $target.offset().left,
            t_right = t_left + $target.width(),
            b_top = $bullet.offset().top,
            b_left = $bullet.offset().left,
            b_right = b_left + $bullet.width();
        if (b_top > t_bottom || b_left > t_right || b_right < t_left) {
            //do nothing
        } else {
            console.log('--HIT--');
            $bullet.stop();
            resetBullet();
            $target.stop();
            $target.hide('explode', {pieces: 32, complete: resetTarget}, 500);
        }
    }// end detectCollision

    function gameComplete() {
        $('<div>', {id: 'splashMessage', class: 'hide'}).appendTo('#playingArea');
        $('<p>Game Over <br> You missed ' + $missedTargets + ' targets!</p>').appendTo('#splashMessage');
        $('#splashMessage')
            .css('top', (0.5 * $('#playingArea').height()) - (0.5 * $('#splashMessage').height()))
            .css('left', (0.5 * $('#playingArea').width()) - (0.5 * $('#splashMessage').width()))
            .toggleClass('hide');
    }

    function removeCharacterFromPlayingArea(obj) {
        if (confirm('Are you sure, you want to remove?')) {
            obj.effect('explode');
            obj.show("fast");
            $('#ctrlArea').children().eq(1).prepend(obj);
            obj.draggable("option", {helper: 'clone', opacity: 0.35});
            $(obj).css({left: 0, top: 0, position: 'relative'});
        } else {
            obj.css({left: 0, top: 0});
        }
    }

    $('#ctrlArea').children().last().append($('<img>', {
        src: '../img/garbage.png',
        width: $('#ctrlArea').width(),
        hover: jump,
        alt: 'garbage'
    }));

    function jump() {
        $(this).effect('bounce', {times: 1}, 'slow');
    }

    function examineErase(event) {

        var pos = $('#ctrlArea').children().last().offset();
        var $garbage = $('#ctrlArea').children().last();
        var left = pos.left;
        var right = left + $garbage.width();
        var top = pos.top;
        var bottom = top + $garbage.height();

        if ((event.pageX > left && event.pageX < right)
            && (event.pageY > top && event.pageY < bottom)) {
            removeCharacterFromPlayingArea($(this));
        }

    }

    $(document).keydown(function(e){
        if (e.keyCode == 32) {
            fireBullet();
        }
    });

})();
