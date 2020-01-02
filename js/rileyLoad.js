const memberData = {
	"eboardSort": [
		"President",
		"Vice President",
		"Treasurer",
		"Secretary"
	],
	"members": [
		{
			"name": "Makenna",
			"eboardRole": "President",
			"major": "Packaging Science",
			"enrollment": "Third Year",
			"photos": [
				{
					"URL": "images/team/makenna_x.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/makenna_fun.jpg",
					"size": "fun"
				}
			],
			"bio": "Hello!  I am a third year Packaging Science major (yes, we exist) from Columbus, Ohio.  I enjoy watching hockey (go Jackets) and attending concerts.  This may sound cliché but joining the House of General Science is one of the best decisions I have made.  I have made so many new friends here as well as gained confidence in myself.  Feel free to reach out if you have any questions about the floor.  I hope to see you around!"
		},
		{
			"name": "Skyler MacDougall",
			"eboardRole": "Vice President",
			"major": "Electrical Engineering Technology",
			"enrollment": "Second Year",
			"photos": [
				{
					"URL": "images/team/nick_kugler_fun.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/nick_kugler.jpg",
					"size": "fun"
				}
			],
			"bio": "Hello, I\'m Skyler MacDougall, and I\'m from Corning, New York. If you dont recognize that place, thats because its basically in the middle of the wilderness on the NY-PA border. When I\'m not doing homework or going to classes, you can find me in my room or in the social lounge, most likely playing video games or just hanging out. In addition to that, my other hobbies include trying to \"fix\" my computer and watching football (go Eagles)."
		},
		{
			"name": "Remi Schneider",
			"eboardRole": "Treasurer",
			"major": "Physics",
			"enrollment": "Second Year",
			"photos": [
				{
					"URL": "images/team/remi_schneider.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/remi_schneider_fun.jpg",
					"size": "fun"
				}
			],
			"bio": "Greetings!! I’m Remi, the current HoGS Treasurer, I’m a first year physics student, and I have an undying love for space, pizza, cats, and mac and cheese. I’m from a small town in central New York called Valatie, where we have very interesting things like fields, waterfalls, fields, tractors, and fields. I enjoy long walks on the beach, piña coladas, and getting caught in the rain."
		},
		{
			"name": "Stephanie Mulligan",
			"eboardRole": "Secretary",
			"major": "Chemistry",
			"enrollment": "First Year",
			"photos": [
				{
					"URL": "images/team/stephanie_mulligan.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/stephanie_mulligan_fun.jpg",
					"size": "fun"
				}
			],
			"bio": "Hello everyone! I’m Stephanie, the current HoGS secretary and a chemistry major/psych minor from Youngstown, Ohio. RIT has made me discover my love of swing dancing and this house. I love spending time on the floor with everyone and I’ve met some of my best friends thanks to the house! I highly recommend HoGS to everyone."
		},
		{
			"name": "Patrick Salts",
			"major": "Computer Science",
			"enrollment": "Third Year",
			"photos": [
				{
					"URL": "images/portfolio/patrick_salts.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/portfolio/modals/m_patrick_salts.jpg",
					"size": "full"
				}
			],
			"bio": "Hi! I’m a third year CS major whomst’s hair has grown entirely too long, and whomst’s hobbies backlog has grown entirely too long. I would like to declare a Japanese minor as soon as I get into a fifth course to make it such. I would love to chat about weeb things and/or books and/or video games!"
		},
		{
			"name": "Brad Hanel",
			"major": "Game Design and Development",
			"minor": "French",
			"enrollment": "Fourth Year",
			"photos": [
				{
					"URL": "images/portfolio/brad_hanel.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/portfolio/modals/m_brad_hanel.jpg",
					"size": "full"
				}
			],
			"bio": "Hi I’m Brad! I’m a game design and development major who likes baseball, math, and fancy cheeses. I used to be the vice president of HoGS, and now I’m on e-board of the comedy club Fowl Play."
		}
	]
}

processEboard: {
	eboard = memberData.members.filter(member => member.eboardRole);
	eboard.sort((a, b) => {
		if (memberData.eboardSort.includes(a.eboardRole)) {
			if (memberData.eboardSort.includes(b.eboardRole)) {
				return memberData.eboardSort.indexOf(a.eboardRole) - memberData.eboardSort.indexOf(b.eboardRole);
			} else {
				return -1;
			}
		} else if (memberData.eboardSort.includes(b.eboardRole)) {
			return +1;
		} else {
			return a.localeCompare(b);
		}
	});

	eboard = eboard.map(member => new Elmen("div").withClasses("col-md-6").withChildren(
		new Elmen("ul").withClasses("exemenu").withChildren(
			new Elmen("li").withChildren(new Elmen("div").withClasses("exewrap").withChildren(
				new Elmen("img").withClasses("img1").withAttributes({src: member.photos.find(photo => photo.size == "thumbnail").URL}),
				new Elmen("img").withClasses("img2").withAttributes({src: member.photos.find(photo => photo.size == "fun").URL})
			)),
			new Elmen("li").withClasses("exetext").withChildren(
				new Elmen("h3").withChildren(member.name),
				...([member.eboardRole, member.major, (member.minor ? member.minor : undefined), member.enrollment].map(infoLine =>
					(infoLine === undefined) ? undefined : new Elmen("p").withChildren(infoLine)
				))
			)
		),
		new Elmen("p").withClasses("exedesc").withChildren(member.bio)
	).done())

	eboardMarkup = [];
	while (eboard.length > 0) {
		if (eboard.length >= 2) {
			eboardMarkup.push(new Elmen("div").withClasses("row").withChildren(eboard.shift(), eboard.shift()).done());
		} else {
			eboardMarkup.push(new Elmen("div").withClasses("row").withChildren(eboard.shift()).done());
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		let eboardSection = document.getElementById("eboard_members");
		if (eboardSection) {
			eboardMarkup.forEach(row => eboardSection.appendChild(row));
		}
	}, {passive: true, once: true, capture: false});
}
