import fs        from "fs"
import path      from "path"
import Sequelize from "sequelize"

let db_url    = process.env.DATABASE
let sequelize = new Sequelize(db_url)
let db        = {}
 
fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js")
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	});
 
Object.keys(db).forEach(function(modelName) {
	if (db[model.name].associate) {
    db[model.name].associate(db)
  }
})
 
db.sequelize = sequelize
db.Sequelize = Sequelize
 
export default db