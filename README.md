# CSC 490 Project

# Branch Hygine

When developing please branch off of dev. You can checkout dev with `git checkout dev`, then branch with `git checkout -b my_branch_name`. You can then push your branch with `git push -u origin my_branch_name`, this will set it up so that the branch automatically tracks the appropriate remote branch. Whenever you are ready for your branch to be merged into dev ensure that it is up to date with dev by running `git merge dev` and handling any merge conflicts. You can then open a PR in Github. Please request at least one other person to review your code before merging it.

# Getting Started

After cloning the repo the first thing you will want to do it copy `.env.example` to `.env`, you shouldn't have to do anything more with that for now.

There is a [docker compose](https://docs.docker.com/compose/) file that will automatically set up a [postgres](https://www.postgresql.org/) database using the credentials in the `.env` file. After [installing docker](https://docs.docker.com/get-started/) run `docker compose up -d` in the repos base directory. All docker data is stored in the docker directory.

You will then need to decide how you are going to decide how to get php set up for running the project. [Laravel provides an install script](https://laravel.com/docs/11.x#installing-php) which should handle most things for you. For a more automatic experience on Windows or MacOS there is also [Laravel Herd](https://herd.laravel.com/). I have never used Herd so I do not have any instructions for setting it up so the following instructions will be for interacting with Laravel through the command line.

You will first need to install all dependencies. You can install the php ones with `composer install`. You can install all JavaScript packages with `npm install`.

In the root of the repo there is a script provided by Laravel called artisan. Artisan is capable of doing basically anything you need to do to interact with Laravel. You can run it by running `php artisan`. When no arguments are provided it will list all available actions. You can get help for any command by running `php artisan help [COMMAND]`. The main one you will need to worry about are `php artisan migrate`. This will run all migrations which will set up database tables. If you need to create all tables from scratch run `php artisan migrate:fresh`. Artisan can also be used to automatically create files such as migrations, models, controllers, etc. For more information or help see the [artisan docs](https://laravel.com/docs/11.x/artisan#main-content) or message Logan.

Before you can run the application you will also need to run `php artisan key:generate`. This sets up an encryption key Laravel uses for various things. Finally you can run `composer run dev` to run the project. This has hot reloading set up and several other niceties. The application will then be available on [http://localhost:8000](http://localhost:8000).

So in all the commands are:

```bash
docker compose up -d
composer install
npm install
php artisan key:generate
php artisan migrate # may want to use migrate:fresh if you want completely fresh tables
composer run dev
```

If you ever need more information check out the [Laravel docs](https://laravel.com/docs/11.x) or message Logan.

# Adding JavaScript and CSS

Everything relating to what is displayed and ran on the client side is in the `resources` directory. To include css make sure it is imported into `resources/css/app.css`. To include JS make sure that it is imported into `resources/js/app.jsx`. Since this project was scaffolded using the Breeze starter kit that means all of our page layouts and templates are using react and inside of the `resources/js` directory as well. [Tailwindcss](https://tailwindcss.com/) is the CSS framework we are using so you are able to use any of it's functionality.

# Adding Backend Functionality

The backend files are scattered across various directories. Anything database related such as migrations is in the `database` directory. Models and controllers are inside of the `app` directory. Those are the main directories you will need to know about. Any file can be added using `php artisan make`. For the most part you can leave the generated file as is, though for models I strongly advise removing the fact that it extends `Model`. This is related to eloquent, which is Laravel's ORM. While it might be useful in simple cases I have a feeling that as the project goes on and we encounter more difficult use cases it will become a hindrance. So I recommend just writing SQL and ignoring eloquent.
