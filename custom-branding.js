Hooks.once('init', function() {
	game.settings.register('custom-branding', 'title', {
		name: 'Page-Title',
		hint: 'This will be shown as the tab name (changes on save)',
		scope: 'world',
		config: true,
		default: 'My Title',
		type: String,
		onChange: updateTab,
	});
	game.settings.register('custom-branding', 'pageastitle', {
		name: 'Active Scene as Page-Title ',
		hint: 'If you want to display the active scene in the title of the browser tab choose an option',
		scope: 'world',
		config: true,
		type: String,
	onChange: reload,
	choices: {
		"": "",
		"asTitle": "as title",
		"afterTitle": "after title"
	},
	});
	game.settings.register('custom-branding', 'favIcon', {
		name: 'Favicon',
		hint: 'This will be the icon for the tab (changes on save)',
		scope: 'world',
		config: true,
		default: 'https://giffyglyph.com/darkerdungeons/images/icons-chapters/giffyglyph.png',
		type: String,
		onChange: updateTab,
	});
	game.settings.register('custom-branding', 'tabletopIcon', {
		name: 'Table Top Icon',
		hint: 'This will be the icon for the top left corder of the virtual table top.',
		scope: 'world',
		config: true,
		default: '',
		type: String,
		onChange: updateTab,
		});
	game.settings.register('custom-branding', 'tabletopIconWidth', {
		name: 'Table Top Icon Width',
		hint: 'This will be the width of the icon in the top left corder of the virtual table top.',
		scope: 'world',
		config: true,
		default: 100,
		type: String,
		onChange: updateTab,
		});
	game.settings.register('custom-branding', 'tabletopIconHeight', {
		name: 'Table Top Icon Height',
		hint: 'This will be the height of the icon for the top left corder of the virtual table top.',
		scope: 'world',
		config: true,
		default: 50,
		type: String,
		onChange: updateTab,
		});
	console.log("Initialised custom-branding");
	// updateTab();
});

Hooks.on('renderApplication', function() {
	if(game.settings.get('custom-branding', 'pageastitle') == "asTitle"){
		document.title = game.scenes.active.data.name;
	}
	else if(game.settings.get('custom-branding', 'pageastitle') == "afterTitle"){
		document.title = game.settings.get("custom-branding", "title") + " | " + game.scenes.active.data.name;
	}

	const tabletopIcon = game.settings.get('custom-branding', 'tabletopIcon');
	if(tabletopIcon && tabletopIcon.length > 0) {
		const logo = $('#logo');
		logo.attr('src', tabletopIcon);
		logo.css('width', game.settings.get('custom-branding', 'tabletopIconWidth')+'px');
		logo.css('height', game.settings.get('custom-branding', 'tabletopIconHeight')+'px');
	}
});

function updateTab(){
	document.title = game.settings.get("mytab", "title");
	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = game.settings.get("mytab", "icon");
	document.getElementsByTagName('head')[0].appendChild(link);
	
};

function reload(){
	location.reload();
	
	if(game.settings.get('mytab', 'pageastitle') == "asTitle"){
		document.title = game.scenes.active.data.name;
	}
	else if(game.settings.get('mytab', 'pageastitle') == "afterTitle"){
		document.title = game.settings.get("mytab", "title") + " | " + game.scenes.active.data.name;
	}
}