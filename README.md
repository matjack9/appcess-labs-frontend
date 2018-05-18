# Appcess Labs

Web development project marketplace for bootcamp students. Ruby on Rails backend and React + Redux frontend.

* [Appcess Labs Backend](https://github.com/matjack9/appcess-labs-backend)
* [Appcess Labs Frontend](https://github.com/matjack9/appcess-labs-frontend)

![appcess-labs-screenshot](https://github.com/matjack9/appcess-labs/blob/master/appcess-labs-screenshot.png)

## Demo

[![Appcess Labs Demo](http://img.youtube.com/vi/Uu3ANC4WO5c/0.jpg)](https://youtu.be/Uu3ANC4WO5c)

## How To Use

* Sign up as either a School or Company (contractor) User. You can join an existing organization as an admin or non-admin with the respective 'account key', or start a totally new group.
* As a School admin User:
  * View all your school's contracts for web development projects
  * Set your school's fee and project turn time which automatically update your Contracts upon acceptance
  * Accept new contracts, and update their progress
  * Assign a contract to a student (non-admin) to work on
* As a School non-admin User:
  * View all school web development projects assigned to you
  * Update your projects' progress and link Github repos
* As a Company admin User:
  * View all your company's web development projects
  * Create new projects to submit to bootcamps
* As a Company non-admin User:
  * View all your company's web development projects
  * View the status of your company's contracts

## Tech

* Ruby v5.1.4
* Ruby on Rails v5.1.5
* PostgreSQL 10
* React v16.3.1
* Redux v3.7.2
* Notable Ruby Gems:
  * jwt: generating tokens for auth
  * fast_jsonapi: serializing API
  * figaro: storing secure keys

## Domain Model

![appcess-labs-relationships](https://github.com/matjack9/appcess-labs/blob/master/appcess-labs-relationships.png)

## Code

Because the project emphasizes backend associations and their validations, here are some code snippets illustrating these dynamics.

### User Types

Four different types of users effectively exist on the User table: School Users and Company Users, each of which can be admins and non-admins. A polymorphic association allows a User to belong to either a School or Company. A boolean column of 'is_admin' suffices to identify admin Users.

`app/models/user.rb`

```Ruby
class User < ApplicationRecord
  belongs_to :account, polymorphic: true
  # School has_many :users, as: :account
  # Company has_many :users, as: :account

  has_many :contracts

  # attr_accessor :is_admin

  validates :email, presence: true
  validates :email, uniqueness: true, case_sensitive: false
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_secure_password

  before_save :titleize_names

  def titleize_names
    self.first_name = self.first_name.split('-').map(&:titleize).join('-')
    self.last_name = self.last_name.split('-').map(&:titleize).join('-')
  end
end
```

### Association Validations

Contracts join Schools and (Companies') Projects, while also optionally belonging to a student User.

`app/models/contract.rb`

```Ruby
class Contract < ApplicationRecord
  belongs_to :school
  belongs_to :project
  belongs_to :user, optional: true
  # School admin users assign Projects to School non-admin Users (students) to work on after Contract acceptance

  validates :school_id, uniqueness: { scope: :project_id }
  # a Project can belong to multiple schools (through Contracts), but there can only be one Contract joining them

  after_save :set_times, if: :will_save_change_to_is_accepted?
  # deadlines are set upon contract acceptance

  def fee_float
    self.fee.to_f
  end

  def set_times
    self.update(start_time: DateTime.now)
    turntime = self.school.turntime
    deadline = self.start_time + turntime.days
    self.update(deadline: deadline)
  end
end
```

### Dynamic Frontend Rendering

Because of the numerous relationships and validations between the four User types, Schools, Companies, Contracts, and Projects, the frontend components are abstract to maximize code reuse. An example can be seen on the frontend's Project Show page. Additional cards and containers become visible if the User belongs to a Company.

`src/containers/projectShow.js`

```JavaScript
render() {
  return (
    <div>
      {this.props.project && !Object.keys(this.props.project).length ? (
        <p>Nothing found</p>
      ) : (
        <div>
          <ProjectCard
            key={uuid()}
            project={this.props.project}
            isFluid={true}
          />
          {this.props.currentUser.account_type === "Company" &&
          this.props.currentUser.is_admin === true ? (
            <Card.Group centered>
              <NewContractCard />
              {/* If the User is an admin of a Company, a card to request a new Contract will be visible */}
            </Card.Group>
          ) : null}
          {this.props.currentUser.account_type === "Company" &&
          this.props.project.id ? (
            <ContractsContainer projectId={this.props.project.id} />
            {/* If the User simply belongs to a Company, all the Company's Contracts will render within this container */}
          ) : null}
        </div>
      )}
    </div>
  );
}
```

## Prerequisites

* Ruby v5.1.4
* PostgreSQL 10
* React v16.3.1
* Redux v3.7.2

## Installation

1.  `git clone --recursive https://github.com/matjack9/appcess-labs` to clone [Appcess Labs](https://github.com/matjack9/appcess-labs) and its submodules
2.  Navigate to `/appcess-labs-backend`, and complete Backend Setup
3.  In a separate terminal window, navigate to `/appcess-labs-frontend`, and complete Frontend Setup

### Backend Setup

After navigating to `/appcess-labs-backend`:

1.  Install gems `bundle install`
2.  Setup database `rake db:create` then `rake db:migrate`
3.  Seed database `rake db:seed`
4.  Start your server `rails s`

### Frontend Setup

After navigating to `/appcess-labs-frontend`:

1.  Install dependencies `yarn install`
2.  Start your server `yarn start`

### In Your Browser

Navigate to the web address of your Node server, e.g. [http://localhost:3001](http://localhost:3001)

## Future Improvements

* Complete update group form
* Organize projects by 'Active' or 'Inactive'
* Implement project searching and filtering
* Messaging between users within project
* Move away from alert error messages

MIT © [Matt Jackson](https://www.linkedin.com/in/matjack/)
