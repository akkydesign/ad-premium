// Main Script Start Here
!function(){for(var n=document.getElementsByTagName("pre"),e=n.length,a=0;e>a;a++){n[a].innerHTML='<span class="line-number"></span>'+n[a].innerHTML+'<span class="cl"></span>';for(var s=n[a].innerHTML.split(/\n/).length,r=0;s>r;r++){var l=n[a].getElementsByTagName("span")[0];l.innerHTML+="<span>"+(r+1)+"</span>"}}}();
// Main Script Ends Here

// Setting Starts Here
var DISQUS_SHORT_NAME='akkydesign';
var Related_Post_Num=3;
var interesting_pop=true;
var facebookComments=false;
var disqusComments=false;
var sidebarMode='right'; // left
var layoutMode='boxed'; // full
var stickySidebar=false;
var stickyMenu=true;
var headerModeCenter=false; // Set false if you want to make header on left

    var perPage=7;
    var numPages=6;
    var firstText ='First';
    var lastText ='Last';
    var prevText ='« Previous';
    var nextText ='Next »';

var RecentTab1= '<i class="fa fa-bar-chart"></i> Business';
var RecentTab2= '<i class="fa fa-star"></i> Featured';
var RecentTab3= '<i class="fa fa-globe"></i> World';
var RecentTab4= '<i class="fa fa-youtube-play"></i> Video';
var SidebarTab1= '<i class="fa fa-rss"></i> Recent';
var SidebarTab2= '<i class="fa fa-fire"></i> Popular';
var SidebarTab3= '<i class="fa fa-comment"></i> Comment';
var RecentNewsLabel= 'Recent News';
var disqus_shortname = DISQUS_SHORT_NAME;
// Settings Ends Here

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
  $(function() {
$(document).ajaxComplete(function() {
      $('a').each(function() {
          var att = $(this).attr('href'),
              vv = $(this);
          if (att !== undefined) {
              if (att.indexOf('/search/label') != -1) {
                  if (att.indexOf('max-results') != -1) {
                      var maxval = getParameterByName('max-results', att),
                          remax=att.replace('max-results='+maxval,'max-results='+perPage);
                    vv.attr('href',remax);
                  } else {
                      if (att.indexOf('?') == -1) {
                          vv.attr('href', att + "?max-results=" + perPage);
                      }else{
                        vv.attr('href', att + "&max-results=" + perPage);
                      }
                  }
              }
          }
      });
});
  });

// Main Script Start Here
$(function () {
	$('.recent-button .tl-recent1').html(RecentTab1);
	$('.recent-button .tl-recent2').html(RecentTab2);
	$('.recent-button .tl-recent3').html(RecentTab3);
	$('.recent-button .tl-recent4').html(RecentTab4);
	$('.tickerl').html(RecentNewsLabel);
	$('.tl-stab-buttons .tl-stabcontent1').html(SidebarTab1);
	$('.tl-stab-buttons .tl-stabcontent2').html(SidebarTab2);
	$('.tl-stab-buttons .tl-stabcontent3').html(SidebarTab3);
	$.ajax({
		type: "GET",
		url: "http://" + disqus_shortname + ".disqus.com/embed.js",
		dataType: "script",
		cache: true
	})
});
function addRan(s) {
	var p = s.feed.entry[0];
	for (var a = 0; a < p.link.length; a++) {
		if ("alternate" == p.link[a].rel) {
			var r = p.link[a].href;
			break
		}
	}
	$('#rbutton').attr('href', r)
}
function getTotal(e) {
	var total = e.feed.openSearch$totalResults.$t,
	s = Math.round(Math.random() * total);
	console.log(s);
	var e = document.createElement('script');
	e.src = '/feeds/posts/summary/?max-results=1&start-index=' + s + '&alt=json-in-script&callback=addRan';
	e.type = 'text/javascript';
	$(e).appendTo('head')
}
$(function () {;
	var e = document.createElement('script');
	e.src = '/feeds/posts/summary/?max-results=0&alt=json-in-script&callback=getTotal';
	e.type = 'text/javascript';
	$(e).appendTo('head')
});
// Main Script Ends Here

function isScrolledIntoView(elem) {
	var $elem = $(elem);
	var $window = $(window);
	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();
	var elemTop = $elem.offset().top;
	var elemBottom = elemTop + $elem.height();
	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop))
}
$(function () {
	if (interesting_pop) {
		var recentWrap = $('.pop-recent');
		recentWrap.append("<span class='close-pop'><i class='fa-close'/></span>");
		$.ajax({
			type: 'GET',
			url: '/feeds/posts/summary?max-results=3&alt=json-in-script&start-index=5',
			async: true,
			contentType: "application/json",
			dataType: 'jsonp',
			success: function (json) {
				var entry = json.feed.entry;
				if (entry) {
					for (var i = 0; i < entry.length; i++) {
						var en = entry[i];
						for (var j = 0; j < json.feed.entry[i].link.length; j++) {
							if (json.feed.entry[i].link[j].rel == 'alternate') {
								var postUrl = json.feed.entry[i].link[j].href;
								break
							}
						}
						try {
							var Img = en.media$thumbnail.url
						} catch(e) {
							var Img = "#"
						}
						var title = en.title.$t,
						author = getauthor(en.author),
						sum = en.summary.$t.substr(0, 300) + "...",
						fauthor = '',
						date = getmeta(en.published.$t);
						var con = '<div class="pop-item"><img src="' + Img + '"/><h3><a href="' + postUrl + '">' + title + '</a></h3><div class="pop-meta">' + author + ' - ' + date + '</div></div>';
						$(con).appendTo(recentWrap)
					}
				}
			}
		})
	}
});
$(function () {
	$(window).scroll(function () {
		if (isScrolledIntoView(document.querySelector('.blog-pager-item'))) {
			if (!$('.pop-recent').hasClass('hard-active')) {
				$('.pop-recent').addClass('active')
			}
		}
	});
	$('.close-pop').click(function () {
		$('.pop-recent').removeClass('active').addClass('hard-active')
	})
});
function getRelated(e) {
	function a(e) {
		$.ajax({
			type: "GET",
			url: "/feeds/posts/summary/-/" + e + "?max-results=5&alt=json-in-script",
			async: true,
			contentType: "application/json",
			dataType: "jsonp",
			success: function (e) {
				var a = e.feed.entry;
				if (a) for (var l = 0; l < a.length; l++) {
					var s = a[l];
					if ( - 1 == t.indexOf(s.id.$t) && r != Related_Post_Num) {
						r++;
						for (var n = 0; n < s.link.length; n++) if ("alternate" == s.link[n].rel) {
							var i = s.link[n].href;
							break
						}
						void 0 !== s.media$thumbnail ? currentImage = s.media$thumbnail.url.replace("s72-c", "w250-h200-c") : currentImage = Default_Image_For_Recent_Posts;
						var d = s.title.$t,
						o = s.category[0].term,
						c = getmeta(s.published.$t),
						h = "<div class='related-item col3 pull-left'><div class='related-item-inner'><div class='tlrp-thumb tl-thumboverlay'><a href='" + i + "'><img src='" + currentImage + "' title='" + d + "'/></a></div><div class='related-content'><h3><a href='" + i + "'>" + d + "</a></h3><div class='related-meta'><a href='/search/label/" + o + "' class='relatedLabel'>" + o + "</a>" + c + "</div></div></div></div>";
						$(".related-posts .related-inner").append(h).trigger("refresh.owl.carousel"),
						t.push(s.id.$t)
					}
				}
			}
		})
	}
	for (var t = [], l = Related_Post_Num, r = 0, s = 0; s < e.length && r != l; s++) a(e[s]);
	$(".related-posts .related-inner").owlCarousel({
		items: 4,
		autoplay: !0,
		nav: !0,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		dots: !1
	})
}
var labelL = [];
$(function () {
	$(".related-posts span.labelname").each(function () {
		labelL.push($(this).text()),
		$(this).remove()
	}),
	0 == labelL.length ? $(".related-posts").html("<h2>No Related Post Found</h2>") : ($(".related-posts").append('<h3 class="related-title"><span>Related Articles</span></h3><div class="related-inner"></div>'), getRelated(labelL))
});

$(document).ready(function () {
	$("#post-carousel").owlCarousel({
		navigation: true,
		autoPlay: true,
		pagination: false,
		transitionStyle: "fade",
		singleItem: true,
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
	})
});
var urlactivepage = location.href;
var home_page = "/";
if (typeof firstText == "undefined") firstText = "First";
if (typeof lastText == "undefined") lastText = "Last";
var noPage;
var currentPage;
var currentPageNo;
var postLabel;
pagecurrentg();
function looppagecurrentg(pageInfo) {
	var html = '';
	pageNumber = parseInt(numPages / 2);
	if (pageNumber == numPages - pageNumber) {
		numPages = pageNumber * 2 + 1
	}
	pageStart = currentPageNo - pageNumber;
	if (pageStart < 1) pageStart = 1;
	lastPageNo = parseInt(pageInfo / perPage) + 1;
	if (lastPageNo - 1 == pageInfo / perPage) lastPageNo = lastPageNo - 1;
	pageEnd = pageStart + numPages - 1;
	if (pageEnd > lastPageNo) pageEnd = lastPageNo;
	html += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
	var prevNumber = parseInt(currentPageNo) - 1;
	if (currentPageNo > 1) {
		if (currentPage == "page") {
			html += '<span class="showpage firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
		} else {
			html += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
		}
	}
	if (currentPageNo > 2) {
		if (currentPageNo == 3) {
			if (currentPage == "page") {
				html += '<span class="showpage"><a href="' + home_page + '">' + prevText + '</a></span>'
			} else {
				html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
			}
		} else {
			if (currentPage == "page") {
				html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + prevNumber + ');return false">' + prevText + '</a></span>'
			} else {
				html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + prevNumber + ');return false">' + prevText + '</a></span>'
			}
		}
	}
	if (pageStart > 1) {
		if (currentPage == "page") {
			html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
		} else {
			html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
		}
	}
	if (pageStart > 2) {
		html += ' ... '
	}
	for (var jj = pageStart; jj <= pageEnd; jj++) {
		if (currentPageNo == jj) {
			html += '<span class="pagecurrent">' + jj + '</span>'
		} else if (jj == 1) {
			if (currentPage == "page") {
				html += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
			} else {
				html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
			}
		} else {
			if (currentPage == "page") {
				html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>'
			} else {
				html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>'
			}
		}
	}
	if (pageEnd < lastPageNo - 1) {
		html += '...'
	}
	if (pageEnd < lastPageNo) {
		if (currentPage == "page") {
			html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
		} else {
			html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
		}
	}
	var nextnumber = parseInt(currentPageNo) + 1;
	if (currentPageNo < (lastPageNo - 1)) {
		if (currentPage == "page") {
			html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + nextnumber + ');return false">' + nextText + '</a></span>'
		} else {
			html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + nextnumber + ');return false">' + nextText + '</a></span>'
		}
	}
	if (currentPageNo < lastPageNo) {
		if (currentPage == "page") {
			html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
		} else {
			html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
		}
	}
	var blogPager = document.getElementById("tl-num-page");
	if (blogPager) {
		blogPager.innerHTML = html
	}
}
function totalcountdata(root) {
	var feed = root.feed;
	var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
	looppagecurrentg(totaldata)
}
function pagecurrentg() {
	var thisUrl = urlactivepage;
	if (thisUrl.indexOf("/search/label/") != -1) {
		if (thisUrl.indexOf("?updated-max") != -1) {
			postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
		} else {
			postLabel = document.body.getAttribute('data-label')
		}
	}
	if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
		if (thisUrl.indexOf("/search/label/") == -1) {
			currentPage = "page";
			if (urlactivepage.indexOf("#PageNo=") != -1) {
				currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
			} else {
				currentPageNo = 1
			}
			document.write("<script src=" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata><\/script>")
		} else {
			currentPage = "label";
			if (thisUrl.indexOf("max-results=") == -1) {
				perPage = 20
			}
			if (urlactivepage.indexOf("#PageNo=") != -1) {
				currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
			} else {
				currentPageNo = 1
			}
			document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1"><\/script>')
		}
	}
}
function redirectpage(numberpage) {
	jsonstart = (numberpage - 1) * perPage;
	noPage = numberpage;
	var nameBody = document.getElementsByTagName('head')[0];
	var newInclude = document.createElement('script');
	newInclude.type = 'text/javascript';
	newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
	nameBody.appendChild(newInclude)
}
function redirectlabel(numberpage) {
	jsonstart = (numberpage - 1) * perPage;
	noPage = numberpage;
	var nameBody = document.getElementsByTagName('head')[0];
	var newInclude = document.createElement('script');
	newInclude.type = 'text/javascript';
	newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
	nameBody.appendChild(newInclude)
}
function finddatepost(root) {
	post = root.feed.entry[0];
	var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
	var timestamp = encodeURIComponent(timestamp1);
	if (currentPage == "page") {
		var pAddress = "/search?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
	} else {
		var pAddress = "/search/label/" + postLabel + "?updated-max=" + timestamp + "&max-results=" + perPage + "#PageNo=" + noPage
	}
	location.href = pAddress
}

$(function(){facebookComments||$(".comment-buttons button.facebook").css("display","none"),disqusComments||$(".comment-buttons button.disqus").css("display","none"),headerModeCenter&&$(".tl-midheader").addClass("to-center"),"full"==layoutMode&&$("#outer-wrapper").attr("id",""),"right"==sidebarMode?$(".main-and-sidebar").addClass("layout1"):$(".main-and-sidebar").addClass("layout2")}),$(function(){return stickyMenu?$(".main-navigation").stick_in_parent({parent:"[data-parent=outer-wrap]"}):void 0}),$(function(){return stickySidebar?$(".sidebar-inner").stick_in_parent({parent:".main-and-sidebar"}):void 0});