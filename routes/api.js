require('../set')
__path = process.cwd()

// Created by: Ronzz YT | ronzxapis.my.id

// Module
var express = require('express');
var router  = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var translate = require('translate-google-api');
var isUrl = require('is-url');
var TinyUrl = require('tinyurl');
var BitlyClient = require('bitly').BitlyClient;
var Canvas = require('canvas');
const Canvacord = require("canvacord");

// Lib
var ronzz = require("../lib/listapi");
var { yta, ytv } = require("../lib/api/y2mate");
var { fetchJson, runtime, getBuffer } = require('../lib/myfunc');

// Features
// Downloader
router.get('/downloader/ytplay', async(req, res, next) => {
  var query = req.query.query
  
  if(!query) return res.json(loghandler.notquery)
  
    let yts = require("yt-search")
	let search = await yts(query)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: {
                 	title: anu.title,
	                 id: anu.videoId,
					 duration: anu.timestamp,
					 views: anu.views,
					 upload: anu.ago,
					 author: anu.author.name,
					 channel: anu.author.url,
					 description: anu.description,
					 url: anu.url
                 }
             })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/downloader/ytmp3', async(req, res, next) => {
  var url = req.query.url
  
  if(!url) return res.json(loghandler.noturl)
  
    var hasil = await yta(url)

             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: {
                 	title: hasil.title,
	                 thumb: hasil.thumb,
					 filesize: hasil.filesizeF,
					 url: hasil.url
                 }
             })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/downloader/ytmp4', async(req, res, next) => {
  var url = req.query.url
  
  if(!url) return res.json(loghandler.noturl)
  
    var hasil = await ytv(url)

             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: {
                 	title: hasil.title,
	                 thumb: hasil.thumb,
					 filesize: hasil.filesizeF,
					 url: hasil.url
                 }
             })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/downloader/facebook', async (req, res, next) => {
	var url = req.query.url
	
	if (!url) return res.json(loghandler.noturl)
	
ronzz.fbdl(url)
.then(data => {
	if (!data.links) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
	})
})

router.get('/downloader/twitter', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)   
		
ronzz.twdl(url)
.then(data => {
	if (!data.thumb ) res.json(loghandler.noturl)
var result = data
res.json({
status: true,
creator: `${creator}`,
result
})
})
.catch(e => {
res.json(loghandler.error)
})
})

router.get('/downloader/tiktok', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)

ronzz.ttdl(url)
.then(data => {
	if (!data.video ) return res.json(loghandler.noturl)
	var result = data
	res.json({
	status: true,
	creator: `${creator}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(loghandler.noturl)
	})
})

router.get('/downloader/igstory', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json(loghandler.notid)   
		
	ronzz.igstory(username)
	.then(data => {
		if (!data ) return res.json(loghandler.notfound)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {  
			 res.json(loghandler.error)
	})
})

router.get('/downloader/igreels', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)

	ronzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {     
			 res.json(loghandler.error)	
	})
})


router.get('/downloader/instagram', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	ronzz.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
	})
})

router.get('/downloader/soundcloud', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json(loghandler.noturl)
	
	ronzz.soundcloud(url)
	.then(data => {
		if (!data.download ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
	})
})

// Asupan
router.get('/asupan/random', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/asupan/santuy', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/santuy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/asupan/bocil', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/bocil.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/asupan/ukhty', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/ukhty.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/asupan/hijaber', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/asupan/gheayubi', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/gheayubi.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})

router.get('/asupan/rikagusriani', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/asupan/rikagusriani.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})

// Cecan
router.get('/cecan/random', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/cecan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})

router.get('/cecan/hijaber', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/cecan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/china', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/china.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/indonesia', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/indonesia.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/japan', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/japan.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/korea', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/korea.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/malaysia', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/malaysia.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/thailand', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/thailand.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})
router.get('/cecan/vietnam', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/vietnam.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
	})
})

// Search
router.get('/search/youtube', async(req, res, next) => {
  var query = req.query.query
  
  if(!query) return res.json(loghandler.notquery)
  
    let yts = require("yt-search")
	let search = await yts(query)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: {
                 	title: anu.title,
	                 id: anu.videoId,
					 duration: anu.timestamp,
					 views: anu.views,
					 upload: anu.ago,
					 author: anu.author.name,
					 channel: anu.author.url,
					 description: anu.description,
					 url: anu.url
                 }
             })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/search/wikimedia', async (req, res, next) => {
	var query = req.query.query
  
	if(!query) return res.json(loghandler.notquery)
	
	ronzz.wikimedia(query)
	.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)
})
})

router.get('/search/pinterest', async (req, res, next) => {
	var query = req.query.query
	
	if (!query) return res.json(loghandler.notquery)   
	
ronzz.pinterest(query)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)
})
})

router.get('/search/wallpaper', async (req, res, next) => {
	var query = req.query.query
	
	if (!query) return res.json(loghandler.notquery)   

ronzz.wallpaper(query)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)
	})
})

router.get('/search/google', async (req, res, next) => {
	var query = req.query.query
	
	if (!query) return res.json(loghandler.notquery)   

googleIt({'query': query}).then(results => {
		if (!results[0]) return res.json(loghandler.notfound)
			res.json({
				status: true,
				creator: `${creator}`,
				result: results
			})

	}).catch(e => {	
		res.json(loghandler.notfound)
	})
})

router.get('/search/googleimage', async (req, res, next) => {
	var query = req.query.query
	
	if (!query) return res.json(loghandler.notquery)   

var gis = require('g-i-s')
gis(query, logResults)

function logResults(error, results) {
  if (error) {
	res.json(loghandler.notfound)
  }
  else {
	if (!results[0]) return res.json(loghandler.notfound)
	res.json({
		status: true,
		creator: `${creator}`,
		result:  results
	})
   
  }
}
})

// Text Pro
router.get('/textpro/pencil', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/glitch', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/blackpink', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/berry', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/neon', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})



router.get('/textpro/logobear', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/3dchristmas', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext) 
	
	ronzz.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/thunder', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/3dboxtext', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)   
	
	ronzz.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/textpro/glitch2', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)   
	if (!text2) return res.json(loghandler.nottext2) 
	
	ronzz.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/glitchtiktok', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	
	ronzz.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	
	ronzz.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	
	ronzz.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	
	ronzz.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/green-horror', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/magma', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/3d-neon-light', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/3d-orange-juice', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/textpro/strawberry', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

// Photo Oxy
router.get('/photooxy/flaming', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/shadow-sky', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/metallic', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/naruto', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/pubg', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	
	if (!text1) return res.json(loghandler.nottext1)
	if (!text2) return res.json(loghandler.nottext2)
	
	ronzz.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/under-grass', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/harry-potter', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/flower-typography', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/picture-of-love', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/coffee-cup', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/butterfly', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/night-sky', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/carved-wood', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})


router.get('/photooxy/illuminated-metallic', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/photooxy/sweet-candy', async (req, res, next) => {
	var text = req.query.text
	
	if (!text) return res.json(loghandler.nottext)
	
	ronzz.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

// Canvas
router.get('/canvas/welcome', async (req, res, next) => {

var name = req.query.name
var member = req.query.member
var gcname = req.query.gcname
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})

Canvas.registerFont('src/fonts/Creme.ttf', { family: 'creme' })

var welcomeCanvas = {}
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px creme'
welcomeCanvas.context.fillStyle = '#ffffff'

await Canvas.loadImage("src/images/wbg1.jpg").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)

})

let can = welcomeCanvas

await Canvas.loadImage(bg)
.then(bg => {
can.context.drawImage(bg, 320, 0, 709, 360)
})

    let canvas = welcomeCanvas
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
    canvas.context.stroke()
    canvas.context.fill()
    canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
    canvas.context.fillText("Welcome", 670, 140)
    canvas.context.font = '100px Helvetica'
    canvas.context.fillText("____     ____", 670, 160)
    canvas.context.fillText("To", 670, 215)
    canvas.context.font = '100px creme'
    canvas.context.fillText(shortText(gcname, 17), 670, 300)
    canvas.context.font = '40px creme'
    canvas.context.textAlign = 'start'
    canvas.context.fillText(shortText(name, 40), 420, 420)
    canvas.context.font = '35px creme'
    canvas.context.fillText(`${shortText(member, 10)} Member`, 430, 490)
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(pp)
    .then(pp => {
        canvas.context.drawImage(pp, 1, 150, 300, 300)
    })
    

    res.set({'Content-Type': 'image/png'})
    res.send(canvas.create.toBuffer())
})

router.get('/canvas/welcome2', async (req, res, next) => {
var name = req.query.name
var member = req.query.member
var gcname = req.query.gcname
var gcicon = req.query.gcicon
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!gcicon) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Icon Url"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
	
var requestSettings = {
url: `https://saipulanuar.ga/api/canvas/welcome?name=${name}&gcname=${gcname}&pp=${pp}&bg=${bg}&membercount=${member}&gcicon=${gcicon}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/welcome3', async (req, res, next) => {
var name = req.query.name
var member = req.query.member
var gcname = req.query.gcname
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
	
var requestSettings = {
url: `https://api.popcat.xyz/welcomecard?background=${bg}&text1=${name}&text2=Welcome+To+${gcname}&text3=Member+${member}&avatar=${pp}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/goodbye', async (req, res, next) => {

var name = req.query.name
var member = req.query.member
var gcname = req.query.gcname
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})

Canvas.registerFont('src/fonts/Creme.ttf', { family: 'creme' })

var goodbyeCanvas = {}
goodbyeCanvas.create = Canvas.createCanvas(1024, 500)
goodbyeCanvas.context = goodbyeCanvas.create.getContext('2d')
goodbyeCanvas.context.font = '72px creme'
goodbyeCanvas.context.fillStyle = '#ffffff'

await Canvas.loadImage("src/images/wbg1.jpg").then(async (img) => {
    goodbyeCanvas.context.drawImage(img, 0, 0, 1024, 500)

})

let can = goodbyeCanvas

await Canvas.loadImage(bg)
.then(bg => {
can.context.drawImage(bg, 320, 0, 709, 360)
})

    let canvas = goodbyeCanvas
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
    canvas.context.stroke()
    canvas.context.fill()
    canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
    canvas.context.fillText("Leave", 670, 140)
    canvas.context.font = '100px Helvetica'
    canvas.context.fillText("____          ____", 670, 160)
    canvas.context.fillText("From", 670, 215)
    canvas.context.font = '100px creme'
    canvas.context.fillText(shortText(gcname, 17), 670, 300)
    canvas.context.font = '40px creme'
    canvas.context.textAlign = 'start'
    canvas.context.fillText(shortText(name, 40), 420, 420)
    canvas.context.font = '35px creme'
    canvas.context.fillText(`${shortText(member, 10)} Member`, 430, 490)
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(pp)
    .then(pp => {
        canvas.context.drawImage(pp, 1, 150, 300, 300)
    })
    

    res.set({'Content-Type': 'image/png'})
    res.send(canvas.create.toBuffer())
})

router.get('/canvas/goodbye2', async (req, res, next) => {
var name = req.query.name
var member = req.query.member
var gcname = req.query.gcname
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!gcname) return res.json({ status : false, creator : `${creator}`, message : "Enter Group Name"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})
	
var requestSettings = {
url: `https://api.popcat.xyz/welcomecard?background=${bg}&text1=${name}&text2=Leave+From+${gcname}&text3=Member+${member}&avatar=${pp}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/verify', async (req, res, next) => {

var name = req.query.name
var member = req.query.member
var resi = req.query.resi
var pp = req.query.pp
var bg = req.query.bg

if (!name) return res.json({ status : false, creator : `${creator}`, message : "Enter Name"})
if (!member) return res.json({ status : false, creator : `${creator}`, message : "Enter Members Amount"})
if (!resi) return res.json({ status : false, creator : `${creator}`, message : "Enter Resi Amount"})
if (!pp) return res.json({ status : false, creator : `${creator}`, message : "Enter Photo Profile Url"})
if (!bg) return res.json({ status : false, creator : `${creator}`, message : "Enter Background Url"})

Canvas.registerFont('src/fonts/Creme.ttf', { family: 'creme' })

var verifyCanvas = {}
verifyCanvas.create = Canvas.createCanvas(1024, 500)
verifyCanvas.context = verifyCanvas.create.getContext('2d')
verifyCanvas.context.font = '72px creme'
verifyCanvas.context.fillStyle = '#ffffff'

await Canvas.loadImage("src/images/wbg1.jpg").then(async (img) => {
    verifyCanvas.context.drawImage(img, 0, 0, 1024, 500)

})

let can = verifyCanvas

await Canvas.loadImage(bg)
.then(bg => {
can.context.drawImage(bg, 320, 0, 709, 360)
})

    let canvas = verifyCanvas
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
    canvas.context.stroke()
    canvas.context.fill()
    canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
    canvas.context.fillText("Verifycation", 670, 140)
    canvas.context.font = '100px Helvetica'
    canvas.context.fillText("_____________", 670, 160)
    canvas.context.fillText(shortText(resi, 20), 670, 300)
    canvas.context.font = '40px creme'
    canvas.context.textAlign = 'start'
    canvas.context.fillText(shortText(name, 40), 420, 420)
    canvas.context.font = '35px creme'
    canvas.context.fillText(`${shortText(member, 10)} Member`, 430, 490)
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(pp)
    .then(pp => {
        canvas.context.drawImage(pp, 1, 150, 300, 300)
    })
    

    res.set({'Content-Type': 'image/png'})
    res.send(canvas.create.toBuffer())
})

// Maker
router.get('/maker/ttp', async(req, res, next) => {
  var text = req.query.text
  if (!text) return res.json(loghandler.nottext)
  
  var data = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(text)}`)
  res.set({'Content-Type': 'image/png'})
  res.send(data)
})

router.get('/maker/attp', async(req, res, next) => {
  var text = req.query.text
  if (!text) return res.json(loghandler.nottext)
  
  var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(text)}`)
  res.set({'Content-Type': 'image/png'})
  res.send(data)
})

router.get('/maker/nulis', async(req, res, next) => {
  const text = req.query.text
  
  if(!text) return res.json(loghandler.nottext)
  
  let result = `https://danzzapi.xyz/api/maker/nulis?text=${text}&apikey=danzz`
  data = await fetch(result).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/nulis.png', data)
  res.sendFile(__path +'/tmp/nulis.png')
});

router.get('/maker/circle', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.circle(url);
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})


router.get('/maker/beautiful', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	
	const hasil =  await Canvacord.Canvas.beautiful(url);
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})


router.get('/maker/blur', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	
	const hasil =  await Canvacord.Canvas.blur(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})


router.get('/maker/darkness', async (req, res) => {
	var url = req.query.url
	var num = req.query.num
	if (!url) return res.json(loghandler.noturl)
	if (!num) return res.json(loghandler.notnum)

	const hasil =  await Canvacord.Canvas.darkness(url,shortText(num, 3))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/facepalm', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	
	const hasil =  await Canvacord.Canvas.facepalm(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/invert', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.invert(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/pixelate', async (req, res) => {
	var url = req.query.url
	var num = req.query.num
	if (!url) return res.json(loghandler.noturl)
	if (!num) return res.json(loghandler.notnum)

	const hasil =  await Canvacord.Canvas.pixelate(url,convertStringToNumber(num))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})


router.get('/maker/rainbow', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.rainbow(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/resize', async (req, res) => {
	var url = req.query.url
	var width = req.query.width
	var height = req.query.height

	if (!url) return res.json(loghandler.noturl)
	if (!width) return res.json({ status: false, code: 403, message: 'Error, Invlid Width', maintanied_by: `${creator}` })
	if (!height) return res.json({ status: false, code: 403, message: 'Error, Invlid Height', maintanied_by: `${creator}` })

	let w = width
	let h = height
	if (w>1000){ w = "1000"}
	if (h>1000){ h = "1000"}

	const hasil =  await Canvacord.Canvas.resize(url, convertStringToNumber(w),  convertStringToNumber(h))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/triggered', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.trigger(url)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
})

router.get('/maker/wanted', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.wanted(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/wasted', async (req, res) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

	const hasil =  await Canvacord.Canvas.wasted(url)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
})

router.get('/maker/tts', async (req, res, next) => {
	var text = req.query.text
	var lan = req.query.lang
	if (!text) return res.json(loghandler.nottext)   
	if (!lan) return res.json({ status: false, code: 403, message: 'Error, Invlid Lang', maintanied_by: `${creator}` })   
	
textto.sounds.create({ text: text, voice: lan })
.then(soundUrl => {  
	res.json({
		status: true,
		creator: `${creator}`,
		result: soundUrl
	})
})
.catch(err => {
	res.json(loghandler.error)
	})
})

// Wallpaper
router.get('/wallpaper/aesthetic', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/aesthetic.json')
	res.json({
		status: true,
		creator: `${creator}`,
		result: data[Math.floor(Math.random() * data.length)]
	})
})

router.get('/wallpaper/hp', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/wallhp.json')
	res.json({
		status: true,
		creator: `${creator}`,
		result: data[Math.floor(Math.random() * data.length)]
	})
})

router.get('/wallpaper/ml', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/wallml.json')
	res.json({
		status: true,
		creator: `${creator}`,
		result: data[Math.floor(Math.random() * data.length)]
	})
})

router.get('/wallpaper/pubg', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/pubg.json')
	res.json({
		status: true,
		creator: `${creator}`,
		result: data[Math.floor(Math.random() * data.length)]
	})
})

// Game
router.get('/game/asahotak', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/asahotak.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/caklontong', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/caklontong.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakkalimat', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakkalimat.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebaktebakan', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebaktebakan.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tekateki', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tekateki.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/truth', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/kata-kata/truth.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/dare', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/kata-kata/dare.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/darkjoke', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/kata-kata/darkjoke.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/family100', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/family100.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/pantun', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/kata-kata/pantun.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/siapakahaku', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/siapakahaku.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakgabut', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakgabut.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebaklucu', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebaklucu.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakgambar', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakgambar.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/susunkata', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/susunkata.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakbendera', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakbendera.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakbendera2', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakbendera2.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})


router.get('/game/tebakgame', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakgame.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakkata', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakkata.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebaklirik', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebaklirik.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebaklagu', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebaklagu.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

router.get('/game/tebakkimia', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/games/tebakkimia.json')
	let result = data[Math.floor(Math.random() * data.length)]
	  
	  res.json({
		status: true,
		creator: `${creator}`,
		result: result
	})
})

// Simi
router.get('/fun/simi', async (req, res, next) => {
        var text = req.query.text
        var lang = req.query.lang
   
        if(!text) return res.json(loghandler.nottext)
        if(!lang) return res.json({ message: 'Enter Lang' })

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=${lang}`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: data.success
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/fun/simi-en', async (req, res, next) => {
        var text = req.query.text
   
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=en`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: data.success
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/fun/simi-jp', async (req, res, next) => {
        var text = req.query.text
   
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=jp`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: data.success
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/fun/simi-id', async (req, res, next) => {
        var text = req.query.text
   
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=id`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: data.success
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/fun/simi-ar', async (req, res, next) => {
        var text = req.query.text
   
        if(!text) return res.json(loghandler.nottext)

       fetch(encodeURI(`https://api.simsimi.net/v2/?text=${text}&lc=ar`))
        .then(response => response.json())
        .then(data => {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result: data.success
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

// Sfw
router.get('/sfw/husbu', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/husbu.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/sfw/loli', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/loli.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/sfw/milf', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/milf.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/sfw/neko', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/neko.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/sfw/shota', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/shota.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/sfw/waifu', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/sfw/waifu.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

// Nsfw
router.get('/nsfw/hentai', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/hentai.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/hentaigif', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/hentaigif.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/neko', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/neko.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/orgy', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/orgy.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/panties', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/panties.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/foot', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/foot.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/cuckold', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/cuckold.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/pussy', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/pussy.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/yuri', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/yuri.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/jahy', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/jahy.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/ahegao', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/ahegao.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/bdsm', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/bdsm.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/blowjob', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/blowjob.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/cum', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/cum.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/ero', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/ero.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	console.log(e);
         	res.sendFile(__path + '/views/error.html')
	})
})

router.get('/nsfw/femdom', async (req, res, next) => {
		 fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/nsfw/femdom.json'))
        .then(response => response.json())
        .then(data => {
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	status: true,
             	creator: `${creator}`,
             	result: result.url
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

// Random
router.get('/random/quotes', async (req, res, next) => {
       fetch(encodeURI('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/quoteanime.json'))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil[Math.floor(Math.random() * hasil.length)];
             res.json({
                 creator : `${creator}`,
                 result: result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
	})
})

router.get('/random/ppcouple', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/ppcp.js')
	let result = resultt[Math.floor(Math.random() * random.length)]

	res.json({
	status: true,
	creator: `${creator}`,
		result: {
			cowo: result.cowo,
			cewe: result.cewe
		}
	})
})

router.get('/random/dadu', async (req, res, next) => {
	let dadu = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/dadu.json')
	let results = dadu[Math.floor(Math.random() * dadu.length)]
	var result = await getBuffer(results.result)
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/coffee', async (req, res, next) => {
	var result = await getBuffer('https://coffee.alexflipnote.dev/random')
	res.set({'Content-Type': 'image/png'})
	res.send(result)
})

router.get('/random/aesthetic', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/aesthetic.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/anjing', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/anjing.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/antiwork', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/antiwork.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/blackpink', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/blackpink.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/boneka', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/boneka.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/cosplay', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/cosplay.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/hekel', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/hekel.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/justina', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/justina.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/kayes', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/kayes.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/kpop', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/kpop.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/kucing', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/kucing.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/mobil', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/mobil.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/motor', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/montor.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/notnot', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/notnot.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/profil', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/profil.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/rose', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/rose.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

router.get('/random/ryujin', async (req, res, next) => {
	let random = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/random_image/ryujin.json')
	var result = await getBuffer(random[Math.floor(Math.random() * random.length)])
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})

// Stalk
router.get('/stalker/github', async (req, res, next) => {
	var username = req.query.username
	
	if (!username) return res.json(loghandler.notid)
	
	let ghstalk = await fetchJson(`https://api.github.com/users/${username}`)
	if (!ghstalk.login) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ghstalk
	})
})

router.get('/stalker/tiktok', async (req, res, next) => {
	var username = req.query.username
	
	if (!username) return res.json(loghandler.notid)
	
	let ttstalk = await fetchJson(`https://zenzapis.xyz/stalker/tiktok?username=${username}&apikey=sonelstore`)
	if (!ttstalk.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ttstalk.result
	})
})

router.get('/stalker/instagram', async (req, res, next) => {
	var username = req.query.username
	
	if (!username) return res.json(loghandler.notid)
	
	let igstalk = await fetchJson(`https://zenzapis.xyz/stalker/ig?username=${username}&apikey=sonelstore`)
	if (!igstalk.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: igstalk.result
	})
})

router.get('/stalker/npm', async (req, res, next) => {
	var username = req.query.username
	
	if (!username) return res.json(loghandler.notid)
	
	let npmstalk = await fetchJson(`https://registry.npmjs.org/${username}`)

	res.json({
	status: true,
	creator: `${creator}`,
	result: npmstalk
	})
})

router.get('/stalker/nickhago', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let hg = await fetchJson(`https://zenzapis.xyz/stalker/nickhago?apikey=sonelstore&query=${id}`)
	if (!hg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: hg.result
	})
})

router.get('/stalker/nickccfun', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let cf = await fetchJson(`https://zenzapis.xyz/stalker/nickcocofun?apikey=sonelstore&query=${id}`)
	if (!cf.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: cf.result
	})
})

router.get('/stalker/nickbgl', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let bgl = await fetchJson(`https://zenzapis.xyz/stalker/nickbigolive?apikey=sonelstore&query=${id}`)
	if (!bgl.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: bgl.result
	})
})

router.get('/stalker/nicknmtv', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)

	let nmtv = await fetchJson(`https://zenzapis.xyz/stalker/nicknimotv?apikey=soneletore&query=${id}`)
	if (!nmtv.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: nmtv.result
	})
})

router.get('/stalker/nickpubg', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let pubg = await fetchJson(`https://zenzapis.xyz/stalker/nickpubg?apikey=sonelstore&query=${id}`)
	if (!pubg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: pubg.result
	})
})

router.get('/stalker/nickff', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let ff = await fetchJson(`https://zenzapis.xyz/stalker/nickff?apikey=sonelstore&query=${id}`)
	if (!ff.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ff.result
	})
})

router.get('/stalker/nickml', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	
	if (!id) return res.json(loghandler.notid)
	if (!zoneid) return res.json(loghandler.notid)
	
	let ml = await fetchJson(`https://zenzapis.xyz/stalker/nickml?apikey=sonelstore&query=${id}&query2=${zoneid}`)
	if (!ml.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: ml.result
	})
})

router.get('/stalker/nickmla', async (req, res, next) => {
	var id = req.query.id
	var zoneid = req.query.zoneid
	
	if (!id) return res.json(loghandler.notid)
	if (!zoneid) return res.json(loghandler.notid)
	
	let mla = await fetchJson(`https://zenzapis.xyz/stalker/nickmladventure?apikey=sonelstore&query=${id}&query2=${zoneid}`)
	if (!mla.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: mla.result
	})
})

router.get('/stalker/nicklokapala', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)

	let lp = await fetchJson(`https://zenzapis.xyz/stalker/nicklokapala?apikey=sonelstore&query=${id}`)
	if (!lp.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: lp.result
	})
})

router.get('/stalker/nickdomino', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let dm = await fetchJson(`https://zenzapis.xyz/stalker/nickdomino?apikey=sonelstore&query=${id}`)
	if (!dm.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: dm.result
	})
})

router.get('/stalker/nickzepeto', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let jp = await fetchJson(`https://zenzapis.xyz/stalker/nickzepeto?apikey=sonelstore&query=${id}`)
	if (!jp.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: jp.result
	})
})

router.get('/stalker/nicksausage', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let sg = await fetchJson(`https://zenzapis.xyz/stalker/nicksausage?apikey=sonelstore&query=${id}`)
	if (!sg.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: sg.result
	})
})

router.get('/stalker/nickaov', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	
	let aov = await fetchJson(`https://zenzapis.xyz/stalker/nickaov?apikey=sonelstore&query=${id}`)
	if (!aov.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: aov.result
	})
})

router.get('/stalker/nickcod', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)

	let cod = await fetchJson(`https://zenzapis.xyz/stalker/nickcod?apikey=sonelstore&query=${id}`)
	if (!cod.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: cod.result
	})
})

router.get('/stalker/nickpb', async (req, res, next) => {
	var id = req.query.id
	
	if (!id) return res.json(loghandler.notid)
	let pb = await fetchJson(`https://zenzapis.xyz/stalker/nickpb?apikey=sonelstore&query=${id}`)
	if (!pb.result) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: pb.result
	})
})

// Short Link
router.get('/shortlink/tinyurl', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)  

    var islink = isUrl(url)
	if (!islink) return res.json(loghandler.noturl)  

TinyUrl.shorten(url, function(url, err) {
  if (err) return res.json(loghandler.error)
	res.json({
		status: true,
		creator: `${creator}`,
		result: url
		})
	});
})

router.get('/shortlink/cuttly', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl) 
	
    var islink = isUrl(url)
	if (!islink) return res.json(loghandler.noturl)
	
	let randomapicuttly = apicuttly[Math.floor(Math.random() * apicuttly.length)]
	var hasil = await fetchJson(`https://cutt.ly/api/api.php?key=${randomapicuttly}&short=${url}`)
    if (!hasil.url.shortLink) return res.json(loghandler.error)

	res.json({
		status: true,
		creator: `${creator}`,
		result: hasil.url.shortLink
		})
});

router.get('/shortlink/bitly', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl) 
	
    var islink = isUrl(url)
	if (!islink) return res.json(loghandler.noturl)
	
	let randomapibitly = apibitly[Math.floor(Math.random() * apibitly.length)]
	const bitly = new BitlyClient(randomapibitly)
	bitly
	.shorten(url)
	.then(function(result) {
		res.json({
			status: true,
			creator: `${creator}`,
			result : result.link
			})
	 
	})
	.catch(function(error) {
	 res.json(loghandler.error)
	});
})

// Islamic
router.get('/islamic/randomimage', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/islamic/random_img.json')
	var result = data[Math.floor(Math.random() * data.length)];
	res.json({
	status: true,
	creator: `${creator}`,
	result: result
	})
})

router.get('/islamic/jadwalsholat', async (req, res, next) => {
	
	ronzz.sholat()
.then((data) =>{ 
	if (!data) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/islamic/asmaulhusna', async (req, res, next) => {
	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/islamic/asmaul_husna.json')
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
})

router.get('/islamic/surah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	ronzz.surah(text)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/islamic/tafsirsurah', async (req, res, next) => {
	var text = req.query.text
	if (!text ) return res.json(loghandler.nottext)
	
	ronzz.tafsirsurah(text)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/islamic/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi
	if (!nabi) return res.json(loghandler.notquery)
	
	var data = await fetchJson(`https://raw.githubusercontent.com/Ronzz-Ofc/database/master/islamic/kisah_nabi/${nabi}.json`)
	if (!data[0]) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})

// Tools
router.get('/tools/ebase64', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
})

router.get('/tools/dbase64', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base64',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
})

router.get('/tools/ebase32', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
})

router.get('/tools/dbase32', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "Maximal 2.084 String!"})
	
		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				type: 'base32',
				string: string,
				encode: Buffer.from(text, 'base64').toString('ascii')
				}
		})
})

router.get('/tools/ebinary', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})
	
	function encodeBinary(char) {
		return char.split("").map(str => {
			 const converted = str.charCodeAt(0).toString(2);
			 return converted.padStart(8, "0");
		}).join(" ")
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				string: string,
				encode: encodeBinary(text)
				}
		})
})

router.get('/tools/dbinary', async (req, res, next) => {
	var text = req.query.text
	var string = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)  
	if (text.length > 2084) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.084 String!"})
	
	function dcodeBinary(char) {
		return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result:{
				string: string,
				decode: dcodeBinary(text)
				}
		})
})

router.get('/tools/styletext', async (req, res, next) => {
	var text = req.query.text
	
	if (!text ) return res.json(loghandler.nottext)
	
	const { shortText } = require("limit-text-js")
	var text = shortText(text, 10000)
	ronzz.styletext(text)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.error)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
})
.catch((err) =>{
 res.json(loghandler.error)
	})
})

router.get('/tools/translate', async (req, res, next) => {
	var text = req.query.text
    var lang = req.query.lang
    
	if (!text) return res.json(loghandler.nottext)  
	if (!lang) return res.json({ status : false, creator : `${creator}`, message : "Please Enter Lang. View Lang In https://cloud.google.com/translate/docs/languages"})
	
	const defaultLang = 'en'
	const tld = 'cn'
	
	let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        
    } finally {
		res.json({
			status: true,
			creator: `${creator}`,
			result: result[0]
		})
    }
})

router.get('/tools/ssweb', async (req, res, next) => {
	var link = req.query.link
	var islink = isUrl(link)
	
	if (!link) return res.json(loghandler.noturl)  
	if (!islink) return res.json(loghandler.noturl)  
	
	ronzz.ssweb(link)
	.then((data) =>{ 
		if (!data) return res.json(loghandler.notfound)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.json(loghandler.notfound)
	})
})

router.get('/tools/fakeaddress', async (req, res, next) => {

	let data = await fetchJson('https://raw.githubusercontent.com/Ronzz-Ofc/database/master/tools/fake_address.json')
	res.json({
	status: true,
	creator: `${creator}`,
	result: data
	})
})

// Others
router.get('/other/balikhuruf', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var splitText = text.split('');
	var reverseArray = splitText.reverse();
	var joinArray = reverseArray.join('');
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: joinArray
	})
})

router.get('/other/balikangka', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var splitText = text.split('');
	var reverseArray = splitText.reverse();
	var joinArray = reverseArray.join('');
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: joinArray
	})
})

router.get('/other/heleh', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var hasil = text.replace(/[AIUOaiuo]/g, 'e')
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: hasil
	})
})

router.get('/other/huluh', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var hasil = text.replace(/[AIEOaieo]/g, 'u')
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: hasil
	})
})

router.get('/other/hilih', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var hasil = text.replace(/[AUEOaueo]/g, 'i')
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: hasil
	})
})

router.get('/other/halah', async (req, res, next) => {
	var text = req.query.text
	if (!text) return res.json(loghandler.nottext)
	
	var hasil = text.replace(/[IUEOiueo]/g, 'a')
	
	res.json({
	status: true,
	creator: `${creator}`,
	result: hasil
	})
})

module.exports = router