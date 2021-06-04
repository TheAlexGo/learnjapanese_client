class DataSite {
  constructor() {
    this.corsUrl = "http://localhost:8080/"; // ссылка на сервер с cors-anywhere
  }

  /**
   * Получение JSON со страницы
   * @param {string} url - Строка URL.
   * @param body - тело запроса
   */
  getJSONAsync = async(url, body="") => {
    let response;
    if(body !== "") {
      response = await fetch(this.corsUrl + url, {
        "headers": {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": body,
        "method": "POST",
      })
    } else {
      response = await fetch(this.corsUrl + url);
    }
    try {
      return await response.json();
    } catch (Uncaught) {
      new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Получение текста со страницы
   * @param {string} url - Строка URL.
   * @param body - тело запроса
   */
  getTEXTAsync = async(url, body) => {
    let response = await fetch(this.corsUrl + url, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
      },
      "body": body,
      "method": "POST",
    });
    if (response.ok) {
      return await response.text();
    }
    else throw new Error(`${response.status}: ${response.statusText}`);
  }

  /**
   * Получение ромадзи из слова
   * @param text - переводмсый текст
   * @returns {Promise<string>}
   */
  getRomaji = async(text) => {
    const body = `options%5Bromaji%5D%5Bstyle%5D=hepburn_modified&_token=vqdTFwoyXfRLfSmyAHh76ZfJOqJXsX92n31atRep&text=${text}&type=romaji`
    let html = await this.getTEXTAsync("https://nihongodera.com/tools/convert", body);
    const parser = new DOMParser();
    const page = parser.parseFromString(html, "text/html");
    return page.querySelector('.tool__results').textContent;
  }

  /**
   * Перевод текста в аудиофайл
   * @param text - переводимый текст
   * @returns {Promise<*>} - ссылка за файл
   */
  textToSpeech = async(text) => {
    let url = `https://apihost.ru/d4_enus.php?text=${text}&speaker=ja-JP_EmiV3Voice`;
    let json = await this.getJSONAsync(url);
    return json.fname;
  }

  /**
   * Перевод слова через сервис japanese-words.org с получением перевода, ромадзи и аудиофайла
   * @param text - перводимый текст
   * @returns {Promise<{audioSrc: (string|string), romaji: string, translate: string}|number>}
   */
  getTranslate = async(text) => {
    const serviceUrl = "https://japanese-words.org";
    let body = `search-type=simple&page=1&text=${text}&ajax=Y`;
    let html = await this.getTEXTAsync("https://japanese-words.org/dictionary/search", body);
    const parser = new DOMParser();
    const page = parser.parseFromString(JSON.parse(html).html, "text/html");
    const allVariable = [...page.querySelectorAll('.mb-4')];
    if(!allVariable.length) return 0;
    const currentVariable = allVariable.find(variable =>
      variable.querySelector('.badge-warning'));

    const audioLink = currentVariable.querySelector('.play-example').dataset.link;
    return {
      audioSrc: audioLink[0] === '/' ? serviceUrl+audioLink : audioLink,
      romaji: currentVariable.querySelector('.hint').textContent,
      translate: currentVariable.querySelector('.col-12.mt-3').textContent
    }
  }
}

export default DataSite;
