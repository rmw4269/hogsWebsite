const memberData = {
	"eboardSort": [
		"President",
		"Vice President",
		"Treasurer",
		"Secretary"
	],
	"members": [
		{
			"name": "Abby Lupi",
			"eboardRole": "President",
			"major": "Physics",
			"enrollment": "Second Year",
			"photos": [
				{
					"URL": "images/team/abby_lupi.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/abby_lupi_fun.jpg",
					"size": "fun"
				}
			],
			"bio": "Hello and welcome to the House of General Science! I am a second year physics major with an unhealthy enthusiasm for anything space or particle physics-related. You'll catch me playing Age of Mythology or Magic on the weekends. Fun fact: my first tattoo was a Mobius strip."
		},
		{
			"name": "Nick Kugler",
			"eboardRole": "Vice President",
			"major": "Civil Engineering Technology",
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
			"bio": "Hi!!! I’m Civil Engineering Technology Major from Brooklyn, New York (I’m the only non-physics major on E-Board and I’m scared). I’m super weird and dorky and bad at grammar and bad at knowing when to stop talking and weird and dorky and bad with technology and I like Sci-Fi and I’m VERY into buildings. I spend my time listening to (edgy) music or sitting like an (edgy) pretzel, sometimes both - that’s a fun time. Oh, Oh no … the physics majors are back, STOP!, zz/z/zz STAY, STAY BACK!!! zz/chzz//zch"
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
			"name": "Clare Scroger",
			"eboardRole": "Secretary",
			"major": "Physics",
			"enrollment": "Second Year",
			"photos": [
				{
					"URL": "images/team/clare_scroger.jpg",
					"size": "thumbnail"
				},
				{
					"URL": "images/team/clare_scroger_fun.jpg",
					"size": "fun"
				}
			],
			"bio": "Hi everybody! I'm a first year physics major from Akron, NY. I'm so glad to have joined HoGS this year! The people here are great and the community is amazing for both on and off floor members. You will probably see me somewhere on the floor with a book as I love to read. Even if I'm reading though, you'll still find me out and about socializing too. I like helping people and will give a hand whenever it's needed. This floor has become my second home and I hope it will become yours too! See you on floor!"
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
