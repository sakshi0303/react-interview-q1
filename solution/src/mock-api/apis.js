/**
 * do not change the implementation
 */
export const isNameValid = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log('api', name)
        resolve(name !== 'sakshi');
    }, Math.random() * 2000);
});

/**
 * do not change the implementation
 */
export const getLocations = () => Promise.resolve(['Canada', 'China', 'USA', 'Brazil']);