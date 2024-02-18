class Config {
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followsUrl = "http://localhost:4000/api/follows/";
    public followersCountUrl = "http://localhost:4000/api/follows/followers-count/";
    public followedByUserUrl = "http://localhost:4000/api/follows/followed-by-user/";
    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";
}

const appConfig = new Config();
export default appConfig; 