require([
			'dojo/topic',
			'dojo/_base/array'
		], function(
			topic,
			array
		) {
			var audio;
			var playlist;
			var tracks;
			var current;
			var buttonvalue = "mini";
			init();
			function init(){

				current = 0;
				audio = $('audio');
				playlist = $('#playlist');
				tracks = playlist.find('li a');
				len = tracks.length;
				audio[0].volume = .50;
				//audio[0].play();
				playlist.find('a').click(function(e){
					e.preventDefault();
					link = $(this);
					current = link.parent().index();
					run(link, audio[0]);
				});
				audio[0].addEventListener('ended',function(e){
					current++;
					if(current === len){
						current = 0;
						link = playlist.find('a')[0];
					}else{
						link = playlist.find('a')[current];    
					}
					run($(link),audio[0]);
				});
				function run(link, player){
					player.src = link.attr('href');
					par = link.parent();
					par.addClass('active').siblings().removeClass('active');
					audio[0].load();
					audio[0].play();
				}
			<!-- Play Audio during certain sections -->	
				topic.subscribe('story-load-section', setmusic);
				function setmusic(evt){
					// No Audio on map home screen
					if (evt == 0) {
						audio[0].pause();
					// Play Song 1 when section 1 is active
					} else if (evt == 1) {	
						mysong = 0;
						link = playlist.find('a')[mysong];    
						run($(link),audio[0]);
					// Play Song 2 when section 2 is active	
					} else if (evt == 2) {	
						mysong = 1;
						link = playlist.find('a')[mysong];    
						run($(link),audio[0]);
					// Play Song 3 when section 3 is active	
					}else if (evt == 3) {	
						mysong = 2;
						link = playlist.find('a')[mysong];    
						run($(link),audio[0]);
					// No Audio when section four is active	
					}else if (evt == 4) {
						audio[0].pause();
					// Play Song 2 when section 5 is active	
					}else if (evt == 5) {	
						mysong = 1;
						link = playlist.find('a')[mysong];    
						run($(link),audio[0]);
					}

				}
			}
		// Audio Button
		$(".btn-minimize").click(function(){
			$(this).toggleClass('btn-plus');
			$(".widget-content").slideToggle();
			if (buttonvalue == "mini") {
				$("#audiobutton").html('Minimize Audio');
				buttonvalue = "maxi"
			} else {
				$("#audiobutton").html('Audio');
				buttonvalue = "mini";
			}
		});
	});