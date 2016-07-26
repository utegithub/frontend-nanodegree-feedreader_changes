$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('no URL is empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toMatch(/http/);
            });
        });
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('no name is empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            });
        });
    });
    //}
    /* Test that ensures the menu element is
     * hidden by default.
     */
    describe('The menu', function() {
        it('meny is hidden when loading page', function() {
            var body = $('body');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('menu changes when icon is clicked', function() {
            var body = $('body');
            $('.menu-icon-link').trigger("click");
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger("click");
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /*  Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(1, done);
        });
        it('at least one entry feed', function(done) {
            //Checks if there are DOM elements for feed.entry
            var feed = $('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
            done();
        });
    });
    /* Test suite that ensures when a new feed is loaded
     */
    describe('New Feed Selection', function() {
        var first;
        var second;
        beforeEach(function(done) {
            loadFeed(0, function() {
                first = $('.feed').children().text();
                done();

            });
        });
        it('content changes after new feed has been loaded', function(done) {
            loadFeed(1, function() {
                second = $('.feed').children().text();
                expect(first).not.toEqual(second);
                done();
            });

        });
    });
});