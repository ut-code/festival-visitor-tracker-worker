use worker::{event, Context, Env, HttpRequest};

#[event(fetch)]
async fn fetch(_req: HttpRequest, _env: Env, _ctx: Context) -> worker::Result<worker::Response> {
    console_error_panic_hook::set_once();
    let res = worker::Response::ok("Hello World!");
    Ok(res?)
}
