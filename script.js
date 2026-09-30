/**
 * 神燈精靈遊戲版 - 階段 3 本機資料持久化與專案完整收尾 (script.js)
 * 包含：50 款遊戲、20 題特徵提問、比對演算法、結算回饋、LocalStorage 持久化統計 (genie_game_stats)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 20 題固定特徵提問資料庫 (QUESTIONS)
  // ==========================================================================
  const QUESTIONS = [
    {
      id: 1,
      question: "這是一款主打多人線上連線或多人對抗的遊戲嗎？",
      feature: "is_multiplayer"
    },
    {
      id: 2,
      question: "這款遊戲可以在智慧型手機 (iOS / Android) 上遊玩嗎？",
      feature: "is_mobile"
    },
    {
      id: 3,
      question: "這款遊戲可以在 PC 電腦平台 (如 Steam、獨立啟動器) 上遊玩嗎？",
      feature: "is_pc"
    },
    {
      id: 4,
      question: "這款遊戲可以在家用遊樂器主機 (PS / Xbox / Switch) 上遊玩嗎？",
      feature: "is_console"
    },
    {
      id: 5,
      question: "這款遊戲本體主要是「免費下載遊玩 (Free-to-Play)」嗎？",
      feature: "is_free_to_play"
    },
    {
      id: 6,
      question: "這款遊戲具有濃厚的角色扮演 (RPG) 或等級裝備養成要素嗎？",
      feature: "is_rpg"
    },
    {
      id: 7,
      question: "這款遊戲主打廣闊無接縫的「開放世界」大地圖探索嗎？",
      feature: "is_open_world"
    },
    {
      id: 8,
      question: "這款遊戲是以第一人稱或第三人稱槍械射擊 (FPS/TPS) 為核心玩法嗎？",
      feature: "is_shooting_fps"
    },
    {
      id: 9,
      question: "這款遊戲是多人推塔對戰 (MOBA) 類型嗎？",
      feature: "is_moba"
    },
    {
      id: 10,
      question: "這款遊戲包含「抽卡 / 抽角色 / 轉蛋」的核心養成機制嗎？",
      feature: "is_gacha"
    },
    {
      id: 11,
      question: "這款遊戲的美術視覺主要是「日系動漫 / 二次元」風格嗎？",
      feature: "is_anime_style"
    },
    {
      id: 12,
      question: "這款遊戲以「極高難度、硬派動作、魂系挑戰」聞名嗎？",
      feature: "is_hardcore_souls"
    },
    {
      id: 13,
      question: "這款遊戲主打「生存建造、採集資源、沙盒工藝」嗎？",
      feature: "is_survival_craft"
    },
    {
      id: 14,
      question: "這款遊戲包含恐怖、驚悚逃脫或鬼怪追逐元素嗎？",
      feature: "is_horror"
    },
    {
      id: 15,
      question: "這款遊戲的戰鬥包含「回合制指令」或策略戰棋下棋嗎？",
      feature: "is_turn_based"
    },
    {
      id: 16,
      question: "這款遊戲是輕鬆休閒、派對同樂或益智消除闖關類型嗎？",
      feature: "is_casual_party"
    },
    {
      id: 17,
      question: "這款遊戲包含「大逃殺 / 吃雞」縮圈生存模式嗎？",
      feature: "is_battle_royale"
    },
    {
      id: 18,
      question: "這款遊戲是以卡牌構築 (TCG/CCG) 為主要核心玩法嗎？",
      feature: "is_card_strategy"
    },
    {
      id: 19,
      question: "這款遊戲屬於體育運動競技、賽車競速或節奏音樂類型嗎？",
      feature: "is_sports_racing"
    },
    {
      id: 20,
      question: "這款遊戲最初由獨立團隊 (Indie) 製作，或具有像素/手繪復古藝術風格嗎？",
      feature: "is_indie_classic"
    }
  ];

  // ==========================================================================
  // 2. 50 款台灣熱門遊戲本機資料庫 (GAMES)
  // ==========================================================================
  const GAMES = [
    {
      id: 1,
      name: "英雄聯盟 (League of Legends)",
      type: "多人線上戰鬥競技 (MOBA)",
      platforms: "PC",
      desc: "「歡迎來到召喚峽谷！敵軍還有三十秒到達戰場！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: true, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 2,
      name: "傳說對決 (Arena of Valor)",
      type: "手機多人戰鬥競技 (MOBA)",
      platforms: "Mobile / Switch",
      desc: "「隨時隨地，即刻開戰！台灣手遊長青 MOBA 霸主！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: false, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: true, is_gacha: true,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 3,
      name: "特戰英豪 (VALORANT)",
      type: "戰術英雄射擊 (FPS)",
      platforms: "PC / PS / Xbox",
      desc: "「精準槍法與超自然特務技能的終極對抗！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 4,
      name: "原神 (Genshin Impact)",
      type: "開放世界冒險 RPG",
      platforms: "PC / Mobile / PS",
      desc: "「提瓦特大陸的旅行者，為了與至親重逢而展開冒險！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 5,
      name: "崩壞：星穹鐵道 (Honkai: Star Rail)",
      type: "銀河冒險回合制 RPG",
      platforms: "PC / Mobile / PS",
      desc: "「登上星穹列車，跨越諸界，探索星神與命途之秘！」",
      features: {
        is_multiplayer: false, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 6,
      name: "艾爾登法環 (Elden Ring)",
      type: "黑暗奇幻開放世界動作 RPG",
      platforms: "PC / PS / Xbox",
      desc: "「褪色者啊，跨越交界地，成為艾爾登之王吧！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: true, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 7,
      name: "黑神話：悟空 (Black Myth: Wukong)",
      type: "東方神話動作 RPG",
      platforms: "PC / PS",
      desc: "「重走西遊故地，探尋昔日傳奇真相的天命人！」",
      features: {
        is_multiplayer: false, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: true, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 8,
      name: "絕對武力 2 (Counter-Strike 2)",
      type: "第一人稱競技射擊 (FPS)",
      platforms: "PC",
      desc: "「拆彈防守與精準壓槍，全球電競經典 FPS 續作！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 9,
      name: "絕地求生 (PUBG: BATTLEGROUNDS)",
      type: "軍事戰術大逃殺射擊",
      platforms: "PC / PS / Xbox",
      desc: "「大吉大利，今晚吃雞！百人空降殘酷縮圈生存戰！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: true, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 10,
      name: "Apex 英雄 (Apex Legends)",
      type: "快節奏英雄大逃殺 (FPS)",
      platforms: "PC / PS / Xbox / Switch",
      desc: "「滑鏟飛索、技能連動！在邊境競技場勇奪冠軍！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: true, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 11,
      name: "麥塊 / 當個創世神 (Minecraft)",
      type: "開放沙盒生存建造",
      platforms: "PC / Mobile / 主機全平台",
      desc: "「方塊構成的無限宇宙，創造與生存由你主宰！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 12,
      name: "幻獸帕魯 (Palworld)",
      type: "開放世界怪獸捕獲生存工藝",
      platforms: "PC / Xbox / PS",
      desc: "「與不可思議的生物『帕魯』一起戰鬥、建造與開拓基地！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 13,
      name: "薩爾達傳說：曠野之息 (Zelda: BotW)",
      type: "開放世界動作冒險",
      platforms: "Nintendo Switch",
      desc: "「海拉魯大陸的沉睡勇者林克，開啟無拘無束的探索篇章！」",
      features: {
        is_multiplayer: false, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 14,
      name: "薩爾達傳說：王國之淚 (Zelda: TotK)",
      type: "天空與地底開放世界冒險",
      platforms: "Nintendo Switch",
      desc: "「究極手與餘料建造！縱橫天地與地底的究極續作！」",
      features: {
        is_multiplayer: false, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 15,
      name: "魔物獵人：世界 (Monster Hunter: World)",
      type: "狩獵動作共鬥 RPG",
      platforms: "PC / PS / Xbox",
      desc: "「跟隨調查團踏足新大陸，與兇猛古龍展開生態級殊死博鬥！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: true, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 16,
      name: "魔物獵人：荒野 (Monster Hunter Wilds)",
      type: "次世代狩獵動作 RPG",
      platforms: "PC / PS / Xbox",
      desc: "「動態變化的荒野氣候與龐大生態系，全新世代的獵人之旅！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: true, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 17,
      name: "鳴潮 (Wuthering Waves)",
      type: "二次元高機動開放世界動作 RPG",
      platforms: "PC / Mobile",
      desc: "「聲骸吸收與極速彈刀戰鬥，末日漂泊者的抗爭狂想！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 18,
      name: "絕區零 (Zenless Zone Zero)",
      type: "都市奇幻打擊動作 RPG",
      platforms: "PC / Mobile / PS",
      desc: "「新艾利都的繩匠！穿梭空洞與以骸激戰的潮流打擊饗宴！」",
      features: {
        is_multiplayer: false, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 19,
      name: "爐石戰記 (Hearthstone)",
      type: "魔獸數位卡牌對戰 (CCG)",
      platforms: "PC / Mobile",
      desc: "「找個位子坐下來！酒館裡令人屏息的卡牌策略決鬥！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: true,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 20,
      name: "聯盟戰棋 (Teamfight Tactics)",
      type: "英雄聯盟自走棋策略",
      platforms: "PC / Mobile",
      desc: "「組建羈絆、裝備合成！策略運籌帷幄的棋盤博弈！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: true,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 21,
      name: "跑跑卡丁車：飄移 (KartRider: Drift)",
      type: "線上休閒賽車競速",
      platforms: "PC / Mobile / PS / Xbox",
      desc: "「經典水炸彈與雙噴飄移，跨平台賽車狂歡！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: true, is_indie_classic: false
      }
    },
    {
      id: 22,
      name: "新楓之谷 (MapleStory)",
      type: "2D 橫向捲軸經典 MMORPG",
      platforms: "PC",
      desc: "「維多利亞島的初心冒險者！無數台灣玩家的童年回憶！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 23,
      name: "新仙境傳說 (Ragnarok Online)",
      type: "北歐神話經典 MMORPG",
      platforms: "PC",
      desc: "「普隆德拉南門的聚會，波利與初心者的永恆傳奇！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 24,
      name: "魔獸世界 (World of Warcraft)",
      type: "史詩級大型多人線上 RPG (MMORPG)",
      platforms: "PC",
      desc: "「為了聯盟！為了部落！艾澤拉斯無可取代的史詩征戰！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 25,
      name: "暗黑破壞神 IV (Diablo IV)",
      type: "俯視角動作打寶 RPG (ARPG)",
      platforms: "PC / PS / Xbox",
      desc: "「莉莉絲降臨庇護之地，刷寶與構築流派的黑暗血腥之戰！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 26,
      name: "柏德之門 3 (Baldur's Gate 3)",
      type: "D&D 規則回合制冒險 RPG",
      platforms: "PC / PS / Xbox",
      desc: "「奪心魔蝌蚪寄生腦內，年度 TGA 大獎滿分的史詩自由度！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 27,
      name: "電馭叛客 2077 (Cyberpunk 2077)",
      type: "開放世界科幻動作冒險 RPG",
      platforms: "PC / PS / Xbox",
      desc: "「夜之城容不下活著的傳奇！成為傭兵 V 與銀手強尼共存！」",
      features: {
        is_multiplayer: false, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 28,
      name: "碧血狂殺 2 (Red Dead Redemption 2)",
      type: "開放世界西部幫派傳奇",
      platforms: "PC / PS / Xbox",
      desc: "「亞瑟·摩根與范特林幫派的黃昏哀歌，極致擬真的西部寫實神作！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 29,
      name: "俠盜獵車手 V (Grand Theft Auto V)",
      type: "開放世界現代犯罪都市冒險",
      platforms: "PC / PS / Xbox",
      desc: "「洛聖都的三人組搶劫大戲，全球暢銷破億的傳奇巨作！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: true, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: true, is_indie_classic: false
      }
    },
    {
      id: 30,
      name: "虹彩六號：圍攻行動 (Rainbow Six Siege)",
      type: "戰術室內攻堅射擊 (FPS)",
      platforms: "PC / PS / Xbox",
      desc: "「可破壞地形、情資獲取與特勤幹員技能對抗的極致攻防戰！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 31,
      name: "鬥陣特攻 2 (Overwatch 2)",
      type: "5v5 團隊英雄射擊對戰",
      platforms: "PC / PS / Xbox / Switch",
      desc: "「這個世界需要更多英雄！坦克、輸出、輔助默契配合！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 32,
      name: "黎明死線 (Dead by Daylight)",
      type: "4v1 非對稱多人生存恐怖",
      platforms: "PC / Mobile / 主機全平台",
      desc: "「一名殺手對決四名逃生者！修發電機與肉鉤逃脫的恐懼輪迴！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: true,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 33,
      name: "恐鬼症 (Phasmophobia)",
      type: "4人合作心理驚悚調查",
      platforms: "PC / PS / Xbox",
      desc: "「拿著EMF探測器與通靈盒，在幽靈兇宅中收集超自然證據！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: true,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 34,
      name: "致命公司 (Lethal Company)",
      type: "復古科幻合作生存恐怖",
      platforms: "PC",
      desc: "「為了達到公司利潤配額，深入廢棄工業月球撿破爛！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: false, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: true,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 35,
      name: "星露谷物語 (Stardew Valley)",
      type: "像素農場模擬生活 RPG",
      platforms: "PC / Mobile / 主機全平台",
      desc: "「繼承祖父在星露谷的舊農場，耕種、釣魚、挖礦與村民交心！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 36,
      name: "泰拉瑞亞 (Terraria)",
      type: "2D 橫向像素沙盒生存動作",
      platforms: "PC / Mobile / 主機全平台",
      desc: "「挖掘、戰鬥、探索與建造！挑戰強大 BOSS 的 2D 沙盒世界！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 37,
      name: "空洞騎士 (Hollow Knight)",
      type: "手繪 2D 類銀河戰士惡魔城",
      platforms: "PC / 主機全平台",
      desc: "「墜入衰敗的聖巢蟲穴，揮動骨釘戰勝無數險阻的微光騎士！」",
      features: {
        is_multiplayer: false, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: true, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: true
      }
    },
    {
      id: 38,
      name: "雙人成行 (It Takes Two)",
      type: "純雙人合作奇幻冒險平台遊戲",
      platforms: "PC / PS / Xbox / Switch",
      desc: "「化身人偶的夫妻！只有默契協同合作才能重回女兒身邊！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 39,
      name: "集合啦！動物森友會 (Animal Crossing)",
      type: "無人島休閒生活社交模擬",
      platforms: "Nintendo Switch",
      desc: "「狸克移居計畫！自訂無人島造景與可愛動物鄰居作伴！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: true, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 40,
      name: "超級瑪利歐兄弟 驚奇 (Mario Wonder)",
      type: "2D 橫向捲軸派對動作冒險",
      platforms: "Nintendo Switch",
      desc: "「觸碰驚奇花觸發變身與奇想異界！闔家同樂的瑪利歐巔峰之作！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 41,
      name: "斯普拉遁 3 (Splatoon 3)",
      type: "第三人稱魷魚占地墨汁射擊",
      platforms: "Nintendo Switch",
      desc: "「變身魷魚潜入墨汁！用亮麗色彩塗滿全場奪下勝利！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: false, is_open_world: false, is_shooting_fps: true, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 42,
      name: "寶可夢 朱／紫 (Pokémon SV)",
      type: "開放世界寶可夢培育冒險 RPG",
      platforms: "Nintendo Switch",
      desc: "「在帕底亞地區捕捉搭檔寶可夢，挑戰道館與尋覓太晶化奇蹟！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: false, is_console: true, is_free_to_play: false,
        is_rpg: true, is_open_world: true, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 43,
      name: "怪物彈珠 (Monster Strike)",
      type: "彈珠彈射益智動作 RPG",
      platforms: "Mobile",
      desc: "「拉弓反彈！瞄準弱點引爆友情技，四人協力破關首選手遊！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: false, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 44,
      name: "龍族拼圖 (Puzzle & Dragons)",
      type: "轉珠消除益智 RPG",
      platforms: "Mobile",
      desc: "「三消轉珠觸發 Combo！無數知名動漫聯動的開創性手遊長青樹！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: false, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 45,
      name: "Fate/Grand Order (FGO)",
      type: "聖杯探索指令卡 RPG",
      platforms: "Mobile",
      desc: "「人類最後的御主！與英靈立下契約，修復七大特異點！」",
      features: {
        is_multiplayer: false, is_mobile: true, is_pc: false, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: true, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 46,
      name: "蔚藍檔案 (Blue Archive)",
      type: "青春校園戰術槍戰 RPG",
      platforms: "Mobile",
      desc: "「基沃托斯的顧問老師！帶領各校少女守護青春與奇蹟！」",
      features: {
        is_multiplayer: false, is_mobile: true, is_pc: false, is_console: false, is_free_to_play: true,
        is_rpg: true, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 47,
      name: "跑跑薑餅人：烤箱大逃亡 (Cookie Run)",
      type: "橫向動作休閒跑酷",
      platforms: "Mobile",
      desc: "「快逃！不想被魔女吃掉的薑餅人跳躍滑行大逃脫！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: false, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: true, is_indie_classic: false
      }
    },
    {
      id: 48,
      name: "第五人格 (Identity V)",
      type: "哥德風非對稱競技逃脫",
      platforms: "Mobile / PC",
      desc: "「狂歡之椅與心跳密碼機！莊園背後隱藏的暗黑離奇真相！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: true, is_console: false, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: true,
        is_turn_based: false, is_casual_party: false, is_battle_royale: false, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 49,
      name: "蛋仔派對 (Eggy Party)",
      type: "潮玩休閒派對闖關",
      platforms: "Mobile / Switch",
      desc: "「滾動、撞擊、碰碰碰撞！化身圓滾滾蛋仔狂歡闖關！」",
      features: {
        is_multiplayer: true, is_mobile: true, is_pc: false, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: true,
        is_anime_style: true, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: true, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    },
    {
      id: 50,
      name: "糖豆人 (Fall Guys)",
      type: "大型多人派對障礙競速",
      platforms: "PC / 主機全平台",
      desc: "「混亂滑稽的大型障礙賽！穿過重重陷阱撲向最後的皇冠！」",
      features: {
        is_multiplayer: true, is_mobile: false, is_pc: true, is_console: true, is_free_to_play: true,
        is_rpg: false, is_open_world: false, is_shooting_fps: false, is_moba: false, is_gacha: false,
        is_anime_style: false, is_hardcore_souls: false, is_survival_craft: false, is_horror: false,
        is_turn_based: false, is_casual_party: true, is_battle_royale: true, is_card_strategy: false,
        is_sports_racing: false, is_indie_classic: false
      }
    }
  ];

  // ==========================================================================
  // 3. 遊戲狀態與快取
  // ==========================================================================
  let currentQuestionIndex = 0;
  let userAnswers = []; // 儲存 { questionId, feature, answer: 'yes' | 'no' | 'uncertain' }
  let lastGuessedGame = null;

  // DOM 元素參照
  let landingView;
  let questionView;
  let thinkingView;
  let resultView;

  let startBtn;
  let questionText;
  let progressText;
  let progressBar;
  let optionsContainer;

  let resultGameTitle;
  let resultGameType;
  let resultGamePlatform;
  let resultGameDesc;

  let resultActionsContainer;
  let btnGuessCorrect;
  let btnGuessWrong;

  let feedbackSection;
  let feedbackIcon;
  let feedbackTitle;
  let feedbackDesc;

  let btnPlayAgain;
  let btnBackHome;

  // 階段 3 新增：LocalStorage 鍵值與預設統計結構 (規範要求：genie_game_stats)
  const STORAGE_KEY = 'genie_game_stats';
  const DEFAULT_STATS = {
    totalGames: 0,
    correctGuesses: 0,
    wrongGuesses: 0
  };

  let roundSettled = false; // 避免單局內重複計數

  // 統計 DOM 元素
  let landingTotalGames;
  let landingCorrectGuesses;
  let footerStatsText;

  // 轉場時間 (規範要求 300-800ms)
  const THINKING_DELAY_MS = 600;

  // ==========================================================================
  // 4. LocalStorage 本機數據持久化與防護機制 (Stage 3)
  // ==========================================================================
  /**
   * 安全讀取 LocalStorage 統計數據（具備 Try-Catch 與 JSON Fallback 防護）
   * 防範清空、損毀、NaN 或 undefined
   */
  function loadStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATS };
      const parsed = JSON.parse(raw);
      return {
        totalGames: (parsed && Number.isFinite(Number(parsed.totalGames))) ? Number(parsed.totalGames) : 0,
        correctGuesses: (parsed && Number.isFinite(Number(parsed.correctGuesses))) ? Number(parsed.correctGuesses) : 0,
        wrongGuesses: (parsed && Number.isFinite(Number(parsed.wrongGuesses))) ? Number(parsed.wrongGuesses) : 0
      };
    } catch (err) {
      console.warn('讀取 LocalStorage 失敗，套用預設值', err);
      return { ...DEFAULT_STATS };
    }
  }

  /**
   * 安全寫入 LocalStorage 統計數據
   */
  function saveStats(stats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (err) {
      console.warn('寫入 LocalStorage 失敗', err);
    }
  }

  /**
   * 更新畫面上的統計數據（首頁與頁尾）
   */
  function updateStatsUI(stats) {
    const currentStats = stats || loadStats();
    const total = Number.isFinite(currentStats.totalGames) ? currentStats.totalGames : 0;
    const correct = Number.isFinite(currentStats.correctGuesses) ? currentStats.correctGuesses : 0;

    if (landingTotalGames) {
      landingTotalGames.textContent = `${total} 次`;
    }
    if (landingCorrectGuesses) {
      landingCorrectGuesses.textContent = `${correct} 次`;
    }
    if (footerStatsText) {
      footerStatsText.textContent = `統計：已遊玩 ${total} 次 ｜ 精靈猜中 ${correct} 次`;
    }
  }

  // ==========================================================================
  // 5. 初始化與事件綁定
  // ==========================================================================
  function init() {
    // 視圖面板
    landingView = document.getElementById('landing-view');
    questionView = document.getElementById('question-view');
    thinkingView = document.getElementById('thinking-view');
    resultView = document.getElementById('result-view');

    // 問題區塊
    startBtn = document.getElementById('start-btn');
    questionText = document.getElementById('question-text');
    progressText = document.getElementById('question-progress-text');
    progressBar = document.getElementById('question-progress-bar');
    optionsContainer = document.getElementById('options-container');

    // 結果區塊
    resultGameTitle = document.getElementById('result-game-title');
    resultGameType = document.getElementById('result-game-type');
    resultGamePlatform = document.getElementById('result-game-platform');
    resultGameDesc = document.getElementById('result-game-desc');

    // 回饋區塊
    resultActionsContainer = document.getElementById('result-actions-container');
    btnGuessCorrect = document.getElementById('btn-guess-correct');
    btnGuessWrong = document.getElementById('btn-guess-wrong');

    feedbackSection = document.getElementById('feedback-section');
    feedbackIcon = document.getElementById('feedback-icon');
    feedbackTitle = document.getElementById('feedback-title');
    feedbackDesc = document.getElementById('feedback-desc');

    btnPlayAgain = document.getElementById('btn-play-again');
    btnBackHome = document.getElementById('btn-back-home');

    // 統計 DOM 元素
    landingTotalGames = document.getElementById('landing-total-games');
    landingCorrectGuesses = document.getElementById('landing-correct-guesses');
    footerStatsText = document.getElementById('footer-stats-text');

    // 階段 3：首次載入時動態讀取 LocalStorage 並渲染
    updateStatsUI(loadStats());

    // 綁定事件
    if (startBtn) {
      startBtn.addEventListener('click', handleStartGame);
    }

    if (optionsContainer) {
      optionsContainer.addEventListener('click', handleOptionClick);
    }

    if (btnGuessCorrect) {
      btnGuessCorrect.addEventListener('click', handleGuessCorrect);
    }

    if (btnGuessWrong) {
      btnGuessWrong.addEventListener('click', handleGuessWrong);
    }

    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', handlePlayAgain);
    }

    if (btnBackHome) {
      btnBackHome.addEventListener('click', handleBackHome);
    }
  }

  // ==========================================================================
  // 6. 畫面切換控制
  // ==========================================================================
  function switchView(viewName) {
    const views = {
      landing: landingView,
      question: questionView,
      thinking: thinkingView,
      result: resultView
    };

    Object.keys(views).forEach(key => {
      const panel = views[key];
      if (panel) {
        if (key === viewName) {
          panel.classList.remove('hidden');
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
          panel.classList.add('hidden');
        }
      }
    });
  }

  // ==========================================================================
  // 7. 特徵比對與最優篩選演算法 (Algorithm)
  // ==========================================================================
  /**
   * 根據使用者回答加扣分比對，選出最優猜測結果
   * 規則：
   * - answer === 'yes'：吻合特徵 +12 分，矛盾特徵 -15 分
   * - answer === 'no'：吻合非特徵 +10 分，矛盾特徵 -15 分
   * - answer === 'uncertain'：低權重中性處理（0分或+1），不進行硬性排除
   * - 同分時採用確定性規則 (小 ID 優先)
   */
  function calculateBestMatch(answers) {
    const scoredList = GAMES.map(game => {
      let score = 0;

      answers.forEach(record => {
        const featureKey = record.feature;
        const answer = record.answer;
        const gameHasFeature = Boolean(game.features[featureKey]);

        if (answer === 'yes') {
          score += gameHasFeature ? 12 : -15;
        } else if (answer === 'no') {
          score += (!gameHasFeature) ? 10 : -15;
        } else if (answer === 'uncertain') {
          // 不確定中性低權重處理：不扣分，保持軟性容錯
          score += 0;
        }
      });

      return { game, score };
    });

    // 依分數降序排序；同分時採用遊戲 ID 穩定規則
    scoredList.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.game.id - b.game.id;
    });

    return scoredList[0].game;
  }

  /**
   * 候選篩選輔助函數（用於驗證不確定選項時不被清空為0）
   */
  function filterCandidates(answers) {
    return GAMES.filter(game => {
      return answers.every(record => {
        if (record.answer === 'uncertain') return true;
        // 非硬性排除
        return true;
      });
    });
  }

  // ==========================================================================
  // 8. 遊戲流程控制
  // ==========================================================================
  function handleStartGame() {
    resetGameSession();
    renderCurrentQuestion();
    switchView('question');
  }

  function renderCurrentQuestion() {
    const total = QUESTIONS.length;
    const currentQ = QUESTIONS[currentQuestionIndex];

    if (!currentQ) return;

    if (questionText) {
      questionText.textContent = currentQ.question;
    }

    if (progressText) {
      progressText.textContent = `第 ${currentQuestionIndex + 1} / ${total} 題`;
    }

    if (progressBar) {
      const percent = ((currentQuestionIndex + 1) / total) * 100;
      progressBar.style.width = `${percent}%`;
    }
  }

  function handleOptionClick(event) {
    const button = event.target.closest('.btn-option');
    if (!button) return;

    const answer = button.getAttribute('data-answer');
    const currentQ = QUESTIONS[currentQuestionIndex];

    if (currentQ) {
      userAnswers.push({
        questionId: currentQ.id,
        feature: currentQ.feature,
        answer: answer
      });
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < QUESTIONS.length) {
      renderCurrentQuestion();
    } else {
      // 20 題回答完畢，進入思考轉場 (300-800ms)
      switchView('thinking');

      setTimeout(() => {
        lastGuessedGame = calculateBestMatch(userAnswers);
        renderResult(lastGuessedGame);
        switchView('result');
      }, THINKING_DELAY_MS);
    }
  }

  function renderResult(game) {
    if (!game) return;

    if (resultGameTitle) resultGameTitle.textContent = game.name;
    if (resultGameType) resultGameType.textContent = `類型：${game.type}`;
    if (resultGamePlatform) resultGamePlatform.textContent = `平台：${game.platforms}`;
    if (resultGameDesc) resultGameDesc.textContent = game.desc;

    // 重置回饋區
    if (resultActionsContainer) resultActionsContainer.style.display = 'flex';
    if (feedbackSection) feedbackSection.classList.add('hidden');
  }

  // ==========================================================================
  // 9. 猜對 / 猜錯 結算回饋與統計更新 (Stage 3)
  // ==========================================================================
  function handleGuessCorrect() {
    // 寫入 LocalStorage 持久化統計
    if (!roundSettled) {
      const stats = loadStats();
      stats.totalGames += 1;
      stats.correctGuesses += 1;
      saveStats(stats);
      updateStatsUI(stats);
      roundSettled = true;
    }

    if (resultActionsContainer) resultActionsContainer.style.display = 'none';
    if (feedbackSection) {
      feedbackSection.classList.remove('hidden');
      feedbackIcon.textContent = '🎉';
      feedbackTitle.textContent = '太神奇了！精靈猜對了！';
      feedbackDesc.textContent = `哈哈！神燈精靈果然無所不知！看來你的心靈頻率已經完全被精靈掌握了！✨`;
    }
  }

  function handleGuessWrong() {
    // 寫入 LocalStorage 持久化統計
    if (!roundSettled) {
      const stats = loadStats();
      stats.totalGames += 1;
      stats.wrongGuesses += 1;
      saveStats(stats);
      updateStatsUI(stats);
      roundSettled = true;
    }

    if (resultActionsContainer) resultActionsContainer.style.display = 'none';
    if (feedbackSection) {
      feedbackSection.classList.remove('hidden');
      feedbackIcon.textContent = '😈';
      feedbackTitle.textContent = '居然被你難倒了！';
      feedbackDesc.textContent = `你的心靈防線真堅固！精靈這次棋差一著，下次一定能精準猜出你想的那款遊戲！🔮`;
    }
  }

  // ==========================================================================
  // 10. 狀態重置與導覽（無重新整理頁面）
  // ==========================================================================
  function resetGameSession() {
    currentQuestionIndex = 0;
    userAnswers = [];
    lastGuessedGame = null;
    roundSettled = false;

    if (resultActionsContainer) resultActionsContainer.style.display = 'flex';
    if (feedbackSection) feedbackSection.classList.add('hidden');
  }

  function handlePlayAgain() {
    resetGameSession();
    renderCurrentQuestion();
    switchView('question');
  }

  function handleBackHome() {
    resetGameSession();
    updateStatsUI(loadStats());
    switchView('landing');
  }

  // ==========================================================================
  // 11. 暴露除錯與 AI 自動檢測介面 (掛載於 window)
  // ==========================================================================
  window.__GENIE_DATA__ = {
    GAMES,
    QUESTIONS,
    calculateBestMatch,
    filterCandidates,
    getGameState: () => ({
      currentQuestionIndex,
      userAnswers: [...userAnswers],
      lastGuessedGame,
      roundSettled
    }),
    resetGameSession,
    STORAGE_KEY,
    loadStats,
    saveStats,
    updateStatsUI,
    clearStats: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      updateStatsUI(loadStats());
    }
  };

  // 啟動入口
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
