# Adopt a Street

We've switched to [Ruby on Rails](http://rubyonrails.org/)!

- Catch up on the project here: [Project: Adopt-a-“Thing”](http://forum.codeforcharlotte.org/t/project-adopt-a-thing/212)
- View project todos here: [Waffle.io](https://waffle.io/codeforcharlotte/adopt_a_node).

### Getting Started

**Note:** All the assets from the Node version should be in `public/old-code/`.

- Install [Ruby on Rails](http://rubyonrails.org/)
- 
- Open your Terminal and run `rails server` to boot up the server
- View the site at `http://localhost:3000/`

#### In Windows
Using [chocolatey](https://chocolatey.org/) get ruby, ruby dev kit (needed for json) and sqlite. From an admin command prompt run the following:

- choco install ruby
- choco install ruby2.devkit
- choco install sqlite

Update the devkit config file in order for it to find ruby. Open a command prompt with ruby, navigate to your cloned project directory for this project, and run:

- gem install rails
- bundle install
- rails server


For more help with Rails, [check out the site](http://rubyonrails.org/).

### Stuff to add to the README

- What is ERB?
- How to handle assets (¿Cómo se dice SASS?)
- Helpful resources for Rails
