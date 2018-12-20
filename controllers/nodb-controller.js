module.exports = {
	health: (req,res,next) => {
		res.send('ok');
	},
	logreqs: (req,res,next) => {
		console.log(`Incoming request: ${req.originalUrl}`);
		next();
	}
}
