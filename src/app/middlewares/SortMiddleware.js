module.exports = function SortMiddelware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        /*
    // Check if sort is enabled option 1
     res.locals._sort.enabled = true;
     res.locals._sort.column = req.query.column;
     res.locals._sort.type = req.query.type;
    */
        // Check if sort is enabled option 2
        Object.assign(res.locals._sort, {
            enabled: true,
            column: req.query.column,
            type: req.query.type,
        });
    }

    next();
};
