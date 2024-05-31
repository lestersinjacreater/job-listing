// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        renderJobListings(data);
        setupFilters(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  let selectedFilters = [];
  
  function renderJobListings(jobListings) {
    const listingsContainer = document.getElementById('job-listings');
    listingsContainer.innerHTML = '';
  
    jobListings.forEach(job => {
      if (shouldDisplayJob(job)) {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-listing';
  
        const jobHeader = document.createElement('div');
        jobHeader.className = 'job-header';
  
        const companyLogo = document.createElement('img');
        companyLogo.className = 'company-logo';
        companyLogo.src = job.logo;
        companyLogo.alt = job.company;
  
        const companyElement = document.createElement('span');
        companyElement.className = 'company';
        companyElement.textContent = job.company;
  
        const newFeaturedElement = document.createElement('span');
        newFeaturedElement.className = 'new-featured';
        if (job.new) {
          const newElement = document.createElement('span');
          newElement.className = 'new';
          newElement.textContent = 'New!';
          newFeaturedElement.appendChild(newElement);
        }
        if (job.featured) {
          const featuredElement = document.createElement('span');
          featuredElement.className = 'featured';
          featuredElement.textContent = 'Featured';
          newFeaturedElement.appendChild(featuredElement);
        }
  
        jobHeader.appendChild(companyLogo);
        jobHeader.appendChild(companyElement);
        jobHeader.appendChild(newFeaturedElement);
        jobElement.appendChild(jobHeader);
  
        const jobTitleContainer = document.createElement('div');
        jobTitleContainer.className = 'job-title-container';
  
        const jobTitle = document.createElement('div');
        jobTitle.className = 'job-title';
        jobTitle.textContent = job.position;
        jobTitleContainer.appendChild(jobTitle);
  
        const jobTags = document.createElement('div');
        jobTags.className = 'job-tags';
        job.languages.concat(job.tools).forEach(skill => {
          const tagElement = document.createElement('span');
          tagElement.textContent = skill;
          tagElement.className = 'filter-tag';
          tagElement.addEventListener('click', () => toggleFilter(skill));
          jobTags.appendChild(tagElement);
        });
  
        jobTitleContainer.appendChild(jobTags);
        jobElement.appendChild(jobTitleContainer);
  
        const jobMeta = document.createElement('div');
        jobMeta.className = 'job-meta';
        jobMeta.innerHTML = `<span>${job.postedAt}</span><span>• ${job.contract}</span><span>• ${job.location}</span>`;
        jobElement.appendChild(jobMeta);
  
        listingsContainer.appendChild(jobElement);
      }
    });
  }
  
  function setupFilters(jobListings) {
    const filter
    