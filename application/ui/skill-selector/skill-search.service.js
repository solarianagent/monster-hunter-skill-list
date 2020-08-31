import {graphQlQueryService} from '../shared/graphql-query.service.js'; 

class SkillSearchService {
  /**
   * Gets Skill Suggestions based on partial
   * @param {string} partialSkillName 
   * @return {Promise<string[]>} results
   */
  async getSkillSuggestions(partialSkillName) {
    const {skills} = await graphQlQueryService.query(`{skills(name:"${partialSkillName}", limit:5){name}}`);
    return skills.map(skill => skill.name);
  }

  async getSkill(skillName) {
    const {skill} = (await graphQlQueryService.query(`{skill(name:"${skillName}"){name}}`));
    return skill.name;
  }
}

export const skillSearchService = new SkillSearchService();