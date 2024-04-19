
var visitDate = new Date();
var visitTime1 = visitDate.getTime();
var visitTime = String(Math.floor(visitTime1 / 1000));
var visitCode = visitTime.concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1));
var urlHost = window.location.host.toLowerCase();
var visitUrl = window.location.pathname;
var visitUrls = visitUrl.split("/");

setTimeout(function() {
	if (visitUrls.length >= 4 && urlHost == 'online.pubhtml5.com') {
		$.getScript("../getuserinfo.js")
			.done(function (script, textStatus) {
				if(typeof user_type == 'undefined') {
					user_type = userInfo['user_type']
					disable_ad = userInfo['disable_ad']
				}
				if (user_type == 0) {
					// å¹¿å‘Šé…ç½®å‚æ•°
					var ads = [
						{
							name: 'ph_small',
							width: 320,
							height: 50,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="3905104469"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
						},
						{
							name: 'ph_middle',
							width: 468,
							height: 60,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="5792901208"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
						},
						{
							name: 'ph_large',
							width: 728,
							height: 90,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="7409235200"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({});</script>'
						}
					];
					// æ ¹æ®çª—å£å®½åº¦ï¼Œç¡®å®šè¦åŠ è½½çš„å¹¿å‘Šå°ºå¯¸
					var ad;
					var windowWidth = $(window).width();
					if (windowWidth >= 1000) {
						ad = ads[2];
					} else if (windowWidth < 1000 && windowWidth >= 600) {
						ad = ads[1];
					} else {
						ad = ads[0];
					}
					var barHeight = 0;
					var hasBar = false;
					var bottom = 25;
					var other = 8;
					var old_buttonMargin = 0;
					var old_topMargin = 0;
					if (typeof toolBar == 'object' && typeof toolBar.getBottomHeight == 'function') {
						var new_topMargin = 0
						var barHeight = toolBar.getBottomHeight(true)
						if(typeof isPhone === 'undefined' || typeof isPad === 'undefined') {
								
						} else {
							if (isPhone() || isPad()) {
								barHeight = barHeight == 0 ? 40 : barHeight
								new_topMargin = toolBar.getTopHeight(true)
							}
						}
						hasBar = true;
						bottom = barHeight + other / 2;
	
						var h1 = bottom + other / 2 + ad.height
						var h2 = old_buttonMargin + ad.height + other
	
						old_buttonMargin = bookConfig.bottomMargin || 0;
						old_topMargin = bookConfig.topMargin || 0;
						bookConfig.bottomMargin = Math.max(h1,h2);//old_buttonMargin + ad.height + other;
						bookConfig.topMargin = Math.max(old_topMargin, new_topMargin)
						onStageResize()
					}
	
					// æž„é€ å¹¿å‘Šçš„url
					var iframeSrc, imgSrc;
					if (location.host == 'localhost') {
						imgSrc = "/visit/" + ad.name + ".png";
					} else {
						imgSrc = "//static.pubhtml5.com/book/banner/" + ad.name + ".png";
					}
	
					var $body = $("body");
					var $container = $("<div class='ph5---banner---container'></div>").css({
						display: 'none',
						zIndex: 99999,
						position: "fixed",
						width: ad.width + 'px',
						height: ad.height + 'px',
						left: "50%",
						marginLeft: -ad.width / 2,
						bottom: bottom,
						border: "1px solid #181818",
						background: "white"
					});
	
					var $adsText = $("<div>Ads</div>").css({
						position: "absolute",
						left: "0",
						bottom: "100%",
						background: "white",
						border: "1px solid gray",
						color: "gray",
						padding: "2px 6px",
						fontSize: "13px",
						lineHeight: "13px",
						marginBottom: "2px"
					});
	
					var $closeBtn = $("<div style=''></div>").css({
						cursor: "pointer",
						position: "absolute",
						border: "1px solid #181818",
						width: 22,
						height: 22,
						cursor: "pointer",
						background: "white url(//static.pubhtml5.com/book/banner/close.png) no-repeat 3px 3px",
						left: "100%",
						top: "0px",
						marginLeft: "2px"
					});
	
					$container
						.append($closeBtn)
						.append($adsText);
	
					var $fh_banner = $("<a href='//pubhtml5.com?gad' target='_blank'><img src='" + imgSrc + "' alt='' /></a>").css({
						position: "absolute",
						width: "100%",
						height: "100%"
					});
	
					// æ‰‹æœºç¦ç”¨è°·æ­Œå¹¿å‘Šæ—¶ï¼Œæ·»åŠ æˆ‘ä»¬çš„å¹¿å‘Šã€‚ç”µè„‘å§‹ç»ˆåŠ è½½æˆ‘ä»¬çš„å¹¿å‘Šï¼Œæ²¡ç¦ç”¨è°·æ­Œçš„è¯ï¼Œå†åŠ è½½è°·æ­Œå¹¿å‘ŠæŒ¡ä½æˆ‘ä»¬çš„å¹¿å‘Š
					if (disable_ad == 1) {
						addFH5Ad()
					} else {
						if (isPhone() || isPad()) {
							// addMobileGoogleAd()
							ad = ads[0];
							$container
								.append($(ad.googleAd))
								.appendTo($body);
						} else {
							addPCGoogleAd()
						}
					}
	
					// å¹¿å‘Šå®¹å™¨å»¶è¿Ÿ2sæ‰å‡ºçŽ°
					setTimeout(function () {
						// ç”¨äº†fadeIn, ä¼šå¯¼è‡´å®¹å™¨é«˜åº¦ä¸¢äº†ï¼Œè¿™é‡Œé‡æ–°è®¾ç½®ä¸€ä¸‹é«˜åº¦ã€‚
						$container.height(ad.height).fadeIn(400);
					}, 2000);
	
					$closeBtn.on("click", function () {
						$container.remove();
						if(hasBar) {
							bookConfig.bottomMargin = old_buttonMargin;
							bookConfig.topMargin = old_topMargin
							onStageResize()
						}
						return 
					});
	
					function addFH5Ad() {
						$container
							.append($fh_banner)
							.appendTo($body);
					}
	
					function addPCGoogleAd() {
						$container
							.append($(ad.googleAd))
							.appendTo($body);
					}
	
					function addMobileGoogleAd() {
						$("body").append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script>(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-9840740068404348",enable_page_level_ads: true});</script>');
					}
				}
			})
			.fail(function (jqxhr, settings, exception) {
				//åŠ è½½å¤±è´¥
			});
	}
}, 2000)

function sendvisitinfo(type, page) {
	var type = type;
	var page = page;
	if (type == null) {
		var type = '';
	}
	if (page == null) {
		var page = '';
	}

	var isAdd = false;
	if (visitUrls.length >= 4) {
		var uLink = visitUrls[1];
		var bLink = visitUrls[2];
		if (urlHost == 'online.pubhtml5.com') {
			isAdd = true;
		} else if ((urlHost == 'pubhtml5.com') && (visitUrls[1] == 'read')) {
			var uLink = visitUrls[2];
			var bLink = visitUrls[3];
			isAdd = true;
		} else {
			if (uLink == 'books') {
				uLink = 'domain_' + urlHost;
				isAdd = true;
			}
		}
	}
	if (isAdd == true) {
		jQuery(document).ready(function () {
			getBookCaseConfig("//stat.pubhtml5.com/bookvisitinfo.html?uLink=" + uLink + "&bLink=" + bLink + "&type=" + type + "&page=" + page + "&code=" + visitCode);
		});
	}
}

function getBookCaseConfig(url, callBack) {
	$.ajax({
		async: true,
		url: url,
		type: "GET",
		dataType: 'script',
		jsonp: 'jsoncallback',
		timeout: 5000,
		beforeSend: function () {
		},
		success: function (json, s) {
		},
		complete: function (XMLHttpRequest, textStatus) {
			if (textStatus == "success" && typeof callBack == "function") {
				callBack();
			};
		},
		error: function (xhr) {
		}
	});
};
