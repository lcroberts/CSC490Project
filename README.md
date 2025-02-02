# CSC 490 Project

## Branch Hygiene

When developing please branch off of dev. You can checkout dev with `git checkout dev`, then branch with `git checkout -b my_branch_name`. You can then push your branch with `git push -u origin my_branch_name`, this will set it up so that the branch automatically tracks the appropriate remote branch. Whenever you are ready for your branch to be merged into dev ensure that it is up to date with dev by running `git merge dev` and handling any merge conflicts. You can then open a PR in Github. Please request at least one other person to review your code before merging it.

## Getting Started

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

### S3 Setup

To get S3 working you need to make sure you have everything properly set up in your `.env` file. If you have previously copied the example you may not have the section of it that looks like this:

```bash
# These can be found in a pinned message in the group chat
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

AWS_DEFAULT_REGION="us-east-1"
AWS_BUCKET="csc-490"
AWS_USE_PATH_STYLE_ENDPOINT=false

# Should normally leave commented out. Only set if you want to use someone elses file root for testing purposes or if you want a fresh set of files.
# AWS_S3_ROOT=
```

If you do not, replace any existing AWS environment variables with the above block. Also ensure you have run composer install if you are encountering errors after finishing the setup. Once you have put/found those into your `.env` file find the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in the discord group chat. Everything should work following this.

To use S3 to access or store files there is a helper function in `App\Helpers\StorageHelpers.php` called `getS3Disk` this will return a [laravel disk facade](https://laravel.com/docs/11.x/filesystem#obtaining-disk-instances) that can be used to store and retrieve files. By default you are scoped to a folder of the bucket based off of your computers hostname as long as your `APP_ENV` variable is set to local. You can override this by passing a different root to the function or by setting the `AWS_S3_ROOT` variable in the `.env` file. For any questions please contact Logan.

## IDE Autocompletion

Out of the box your IDE may have issues detecting/completing certain things out of the box. [Laravel IDE Helper](https://github.com/barryvdh/laravel-ide-helper) helps with this. If when you clone the repo you can run `php artisan ide-helper:generate`, `php artisan ide-helper:models`, and if you are running PHP Storm `php artisan ide-helper:meta`. This should fix any issues with hover documentation and completions.

## Adding JavaScript and CSS

Everything relating to what is displayed and ran on the client side is in the `resources` directory. To include css make sure it is imported into `resources/css/app.css`. To include JS make sure that it is imported into `resources/js/app.jsx`. Since this project was scaffolded using the Breeze starter kit that means all of our page layouts and templates are using react and inside of the `resources/js` directory as well. [Tailwindcss](https://tailwindcss.com/) is the CSS framework we are using so you are able to use any of it's functionality.

## Adding Backend Functionality

The backend files are scattered across various directories. Anything database related such as migrations is in the `database` directory. Models and controllers are inside of the `app` directory. Those are the main directories you will need to know about. Any file can be added using `php artisan make`. For the most part you can leave the generated file as is, though for models I strongly advise removing the fact that it extends `Model`. This is related to eloquent, which is Laravel's ORM. While it might be useful in simple cases I have a feeling that as the project goes on and we encounter more difficult use cases it will become a hindrance. So I recommend just writing SQL and ignoring eloquent.


## Example Model, Controller, and Migration

If you wish to see an example model, see `app/Models/ExampleModel.php`.

If you wish to see an example controller see `app/Http/Controllers/ExampleModelController.php`.

If you wish to see an example migration see `database/migrations/2025_01_25_144738_create_example_models_table.php`.

### Adding A New Model

A model is a class that represents a data object. In our case it might be something like a note. The model class is also where any database calls should be written. To make a model you can run `php artisan make:model`. This will pull up a few prompts, the first of which will be the name. The second prompt will be a drop down to select additional resources to create. If a database table does not already exist for the data object you will want to move to `Migration` and hit space to select it. If you are going to be creating routes to update or modify it you will likely want to create a `Resource Controller` as well. If you are unsure you can skip the resource controller for now and add it later if needed. Once the model is created remove the `extends Model`. See the example model for examples on how to do things.

### Adding a Migration

If you need to add a database migration to add or modify a database table you can do so with the following command: `php artisan make:migration`. See the example migration to see examples of how to create a table. Also please do not modify a migration once it is merged into dev. If you need to modify a table create a new migration that modifies a table.

### Adding a Controller

If you need to add a controller you can run `php artisan make:controller`. The example controller has some quick example methods.

## Adding Routes

There is a commented out block in `routes/web.php` with some examples of how to make routes.

### API Routes

If you want to make API routes for the frontend to use you can add the routes to the route group in `routes/api.php`. All routes inside the group require authentication which is done automatically through the `useAxios` hook. Just ensure that any route using the hook is in a route group that requires authentication and has the `AddApiToken` middleware.
