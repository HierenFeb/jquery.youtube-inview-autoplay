/**
 * Create YouTube players from <div> placeholders with IFrame API.
 * Each <div> must have id, width, height and data-video-id attributes to init the player.
 * Start playing the video when iframe is scrolled into view.
 * Pause playing when it is scrolled out of view.
 *
 * Depends on https://github.com/protonet/jquery.inview
 */
;(function ($) {
    $.fn.inViewAutoplay = function (options) {
        return this.filter('[id][width][height][data-video-id]').each(function () {
            var dataIdVideo = this.getAttribute('data-video-id');

            new YT.Player(this.getAttribute('id'), {
                width: this.getAttribute('width'),
                height: this.getAttribute('height'),
                videoId: dataIdVideo,
                playerVars: options,
                events: {
                    'onReady': onPlayerReady
                }
            });

            function onPlayerReady(event) {
                var player = event.target;

                $(player.getIframe()).bind('inview', {player: player}, onPlayerInView);

                if (options.quality) {
                    player.setPlaybackQuality(options.quality);
                }

                if (options.volume) {
                    player.setVolume(options.volume);
                }

                if (options.loop) {
                    player.cuePlaylist(dataIdVideo);
                    player.setLoop(true);
                }
            }

            function onPlayerInView(event, visible) {
                if (visible == true) {
                    event.data.player.playVideo();
                } else {
                    event.data.player.pauseVideo();
                }
            }
        });
    };

})(window.jQuery || window.Zepto);
