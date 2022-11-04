# ReactJS + MobX Boilertplate

### This also serves as my study repo for CI in bitbucket

## Quick Start

1. Clone this repo using `git clone [git-repot-path]`
1. Run `npm install` to install dependencies and clean the git repo.<br />
   *At this point you can run `npm start` to see the example app at `http://localhost:3000`.*
1. Run `npm run test` to run tests.
1. Run `npm run build` to do production-ready build.

> Please see branching rules. **Basically, we do Pull Request and have every concerned dev do a code review**! 

## Design
1. Structure is similar to redux with files classified as `store`,`container` and `component`. Other helper folders are `utils`, `__tests__` and `assets`.
1. Start with App.js.
1. Place all tests inside `__tests__`
1. Place all images and css as subcontents of `assets`
1. Utility classes or pure functions should be placed in `utils`

## Documentation

- [Webpack](https://webpack.github.io)
- [React](https://facebook.github.io/react/)
- [Babel](https://babeljs.io/)
- [Mobx](https://mobx.js.org/)
- [Jest](https://facebook.github.io/jest/)


## Readings

- [Unit testing mobX](https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest)
- [Effective MobX patterns](https://blog.pixelingene.com/2016/10/effective-mobx-patterns-part-1/)
- [MobX connection via Providers](https://egghead.io/lessons/react-mobx-fundamentals-connecting-components-to-stores-using-provider-and-observer)
- [css naming convention](https://www.hallme.com/blog/css-naming-conventions/)
## License

This project is licensed under the MIT license, Copyright (c) 2017. 