function cleanTexts(Input: string[]): string[]
{
    return Input.filter((value)=>{value.trim().length > 0});
}
console.log(cleanTexts([" Home ", "", " About ", " "]));