const showHomepage = (req, res) => {
	res.render('/', { title: 'Loudness Films' });
};


module.exports = { showHomepage };