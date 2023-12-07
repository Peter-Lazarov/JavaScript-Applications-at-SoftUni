export function userMiddleware(context, next){
    context.user = () => JSON.parse(localStorage.getItem('user'));

    next();
}
