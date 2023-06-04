// Created by: Ronzz YT | https://ronzxapis.my.id

// Module
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split('');

// FetchJson
exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

// GetBuffer
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

// Runtime
exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

function randomText(len) {
    const result = [];
    for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    return result.join('');
}

function readFileTxt(file) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(file, 'utf8');
        const array = data.toString().split('\n') ;
        const random = array[Math.floor(Math.random() * array.length)];
        resolve(random.replace('\r', ''));
    })
}

function readFileJson(file) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.parse(fs.readFileSync(file));
        const index = Math.floor(Math.random() * jsonData.length);
        const random = jsonData[index];
        resolve(random);
    })
}

module.exports = { readFileTxt, readFileJson, getHashedPassword, generateAuthToken, randomText };
