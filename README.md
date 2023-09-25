# Task Management

## task-management API

This is a RESTful API for a task management. It provides a set of APIs for performing various operations on a wallet such as creating a task, update the task, fetching all the task which are available in databse, and task metrics details.


## Instructions to run the server and clone the project for other developers:


- [ ] Clone the repository:

Open the terminal and navigate to the desired directory where you want to clone the project.
Use the following command to clone the repository:

```
git clone https://github.com/Iamvivek-gupta/task-management-infeedo/tree/master

```


- [ ] Navigate to the project directory using the following command:

```
cd task-management-infeedo

```


- [ ] Run the following command to install the required dependencies:

```
npm install

```



- [ ] Start the server:
- [ ] Use the following command to start the server:

```
npm start

```
    
- [ ] The server will start at http://localhost:3000/ 



## Endpoints
The following endpoints are available in this API:

## Create a task


- [ ] Endpoint: [/tasks]
- [ ] Method: [POST]
- [ ] Request Body:

```
{
  "title": "testing work",
  "description": "vivek@gmail.com",
  "status": "In progress"
}

```

- [ ] Response:

```
{
    "message": "task created",
    "data": {
        "id": 3,
        "title": "testing work",
        "description": "vivek@gmail.com",
        "status": "In progress",
        "created_at": "2023-09-25T07:48:18.220Z"
    }
}

```






## update a task


- [ ] Endpoint: [/tasks/:id]
- [ ] Method: [PUT]
- [ ] Request Body:

```
{
  "title": "updating work",
  "description": "vivek1@gmail.com",
  "status": "Completed"
}

```

- [ ] Response:

```
{
    "message": "task updated",
    "data": {
        "id": 1,
        "title": "updateing work",
        "description": "vivek@gmail.com",
        "status": "Completed",
        "created_at": "2023-09-25T05:54:18.173Z"
    }
}

```






## get all tasks


- [ ] Endpoint: [/tasks/]
- [ ] Method: [GET]
- [ ] Query Parameter:

```
{
    page:1
    limit:2
}

```

- [ ] Response:

```
{
    "message": "all tasks fetched",
    "data": [
        {
            "id": 3,
            "title": "testing work",
            "description": "vivek@gmail.com",
            "status": "In progress",
            "created_at": "2023-09-25T07:48:18.220Z"
        },
        {
            "id": 2,
            "title": "daily work",
            "description": "tadkeshwar@gmail.com",
            "status": "In progress",
            "created_at": "2023-09-25T05:58:45.038Z"
        }
    ]
}

```





## tasks Metrics


- [ ] Endpoint: [/task-metric/]
- [ ] Method: [GET]


- [ ] Response:

```
[
    {
        "date": "September 2023",
        "open_tasks": "0",
        "inprogress_tasks": "0",
        "completed_tasks": "1"
    }
]

```






# Note
please make sure postgreSQL db is running on your local machine and "task-management" database and "tasks" table is created .


## creted db and table execute below script in postgreSQL db



```
CREATE DATABASE "task-management"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
	
	

	
CREATE TABLE  (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```




















