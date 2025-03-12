/**
 * Complete the functions below, then run `npm run test` in the root directory to check your work.
 * 
 * For more details on expected input and output, check the tests.
 * If all tests are green, you are done! Keep in mind that the actual implementation will be also reviewed.
 * 
 * (don't forget about the html/css task in ../html-css!)
 * 
 * If you find a buggy test, feel free to report (and/or fix) it.
 *
 * ========================================================================================================
 * */
/**
 * Creates a simple object for HTTP headers based on the input.
 * 
 * The input is in the following format:
 * [
 *  [<Header-Name>, <header-value1>, <header-value2?>, ...],
 *  ...
 * ]
 * 
 * Expected output: {
 *  <header-name>: '<header-value1>, <header-value2>, ...'
 * }
 * 
 */
module.exports.createHttpHeaders = (input) => {
    // TODO: your code here
     if (!Array.isArray(input) || input.length === 0) {
        return {};
    }

    const headers = {};

    input.forEach(header => {
        const headerName = header[0].toLowerCase();
        const headerValues = header.slice(1).join(', ');

        if (headers[headerName]) {
            headers[headerName] += `, ${headerValues}`;
        } else {
            headers[headerName] = headerValues;
        }
    });

    return headers;
};

/**
 * Returns items for a paginated list.
 * 
 * The input is in the following format:
 * items: [
 *  { id: 1, title: '<main>item 1</main>', displayTitle: 'Item 1', metadata: {} },
 * ]
 * 
 * params: {
 *  page: 1,
 *  pageSize: 4,
 *  sort: 'asc',
 * }
 * 
 * Expected output:
 * [
 *  { id: 1, title: { main: 'Item 1' }  }
 * ]
 */
module.exports.getItems = (items, params) => {
    // TODO: your code here
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    const { page = 1, pageSize = 4, sort = 'asc' } = params;
    const sortedItems = items.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (sort === 'asc') {
            return titleA.localeCompare(titleB);
        } else {
            return titleB.localeCompare(titleA);
        }
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return sortedItems.slice(startIndex, endIndex).map(item => ({
        id: item.id,
        title: { main: item.displayTitle.replace(/<[^>]+>/g, '') },
    }));
};