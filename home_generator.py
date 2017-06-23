each_post="                <div class=\"post-preview\">\
                    <a href=\"{<link>}\" target=\"_blank\">\
                        <h2 class=\"post-title\">\
                            {<title>}\
                        </h2>\
                        <h3 class=\"post-subtitle\">\
                            {<subtitle>}\
                        </h3>\
                    </a>\
                    <p class=\"post-meta\">Posted on {<date>}</p>\
                </div>\
                <hr>"

import feedparser

rss_url = "https://medium.com/feed/@americast"

feed = feedparser.parse( rss_url )

all_posts=""
for each_feed in feed["entries"]:
	link = each_feed["link"]
	date = each_feed["published"]
	title =  each_feed["title"]

	post_here=each_post.replace('{<link>}',link.decode('utf-8'))
	post_here=post_here.replace('{<date>}',date[:-12].decode('utf-8'))
	post_here=post_here.replace('{<title>}',title.decode('utf-8'))

	subtitle=raw_input("Enter subtitle for "+str(title)+ "or enter 0 to skip:  ")
	if subtitle=='0': continue

	post_here=post_here.replace('{<subtitle>}',subtitle.decode('utf-8'))
	all_posts+=post_here
f=open("first_index.tmpl","r")
all_posts=f.read()+all_posts
f.close()
f=open("last_index.tmpl","r")
all_posts+=f.read()
f.close()
f=open("index.html","w")
f.write(all_posts.encode('utf-8'))
