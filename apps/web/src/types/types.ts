
export interface Post{
    TwitterAccount : {
        name : string;
        username : string;
    };
    content : string;
    scheduledTime : Date;
    status : string;
    twitterAccountId : string;
    createdAt : Date;
}