module.exports = function(gulp, options, plugins) {
    gulp.task("clean:Temp",
        function () {
            var itemsToDelete = [];

            options.typescript.temps.forEach(name => {
                itemsToDelete.push(options.typescript.outPath + "/" + name + "/");
            });

            return plugins.del(itemsToDelete);
        });
};