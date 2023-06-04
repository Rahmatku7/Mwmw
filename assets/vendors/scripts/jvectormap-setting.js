/*!
* Created by: Ronzz YT | https://ronzxapis.my.id
*/
jQuery('#chart1').vectorMap({
	map: 'world_mill_en',
	backgroundColor: '#1b00ff',
	borderWidth: 1,
	zoomOnScroll : false,
	color: '#ddd',
	regionStyle: {
		initial: {
			fill: '#fff'
		}
	},
	enableZoom: true,
	normalizeFunction: 'linear',
	showTooltip: true
});